"use client";
import { HttpLink, ApolloLink} from '@apollo/client'
import { ApolloNextAppProvider, SSRMultipartLink, ApolloClient} from '@apollo/client-integration-nextjs'
import type { ReactNode } from 'react'
import { cache } from '@/app/providers/apollo/cache'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient} from "graphql-ws";
import { getMainDefinition } from '@apollo/client/utilities'

const HTTP_URL = 'https://inctagram.work/api/v1/graphql'
const WS_URL = 'ws://inctagram.work/api/v1/graphql'

function makeAuthLink() {
  return new ApolloLink((operation, forward) => {
    if (typeof window === 'undefined') {
      return forward(operation)
    }
    const token = sessionStorage.getItem('token')
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        ...(token ? { Authorization: `Basic ${token}` } : {}),
      },
    }))
    return forward(operation)
  })
}

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: HTTP_URL,
    credentials: 'include'
  })

  if (typeof window === 'undefined') {
    return new ApolloClient({
      cache,
      link: ApolloLink.from([
        new SSRMultipartLink({stripDefer: true}),
        httpLink
      ]),
    });
  }

  const wsLink = new GraphQLWsLink(
    createClient({
      url: WS_URL,
      connectionParams: () => { // данные для рукопожатия
        const token = sessionStorage.getItem('token')
        return token ? {Authorization: `Basic ${token}`} : {}
      }
    })
  )

  // Разводим трафик: subscription → WS, остальное → HTTPS
  // split — «тройник»: по предикату отправляем запрос в один из двух путей
  const splitLink = ApolloLink.split(
    ({query}) => {
      const def = getMainDefinition(query)
      return def.kind === 'OperationDefinition' && def.operation === 'subscription'
    },
    wsLink, // если def.operation === 'subscription' это подписка — идём по WebSocket
    httpLink  // если def.kind === 'OperationDefinition' — по HTTP
  )

  return new ApolloClient({
    cache,
    link: ApolloLink.from([ // Сначала добавляем makeAuthLink() (он добавит заголовок только когда это уместно — в браузере и для HTTPS-ветки)
      makeAuthLink(), // сначала подставим Authorization (для HTTPS-ветки)
      splitLink   //  потом разведём: subscriptions→WS, остальные→HTTPS // splitLink разрулит, куда пойдёт запрос
    ])
  })
}


export default function ApolloProvider({ children }: { children: ReactNode }) {
  return <ApolloNextAppProvider makeClient={createApolloClient}>
    {children}
  </ApolloNextAppProvider>
}
