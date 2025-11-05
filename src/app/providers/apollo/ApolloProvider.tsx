"use client";
import { HttpLink, ApolloLink } from '@apollo/client'
import { ApolloNextAppProvider, SSRMultipartLink, ApolloClient } from '@apollo/client-integration-nextjs'
import { ReactNode } from 'react'
import { cache } from '@/app/providers/apollo/cache'

function createClient() {
  const httpLink = new HttpLink({
    uri: 'https://inctagram.work/api/v1/graphql',
    credentials: 'include',
  })

  const makeAuthToken = () => {
    return new ApolloLink((operation, forward) => {
      if (typeof window === "undefined") {
        return forward(operation);
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

  const link =
    typeof window === "undefined"
      ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), httpLink])
      : ApolloLink.from([makeAuthToken(), httpLink]);

  return new ApolloClient({
    cache,
    link,
  })
}

export default function ApolloProvider({ children }: { children: ReactNode }) {
  return <ApolloNextAppProvider makeClient={createClient}>
    {children}
  </ApolloNextAppProvider>
}
