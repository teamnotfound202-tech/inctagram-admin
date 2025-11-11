import * as Types from '../../../shared/graphql/__generated__/graphql'

import { ISOStringFormat } from 'date-fns'
import { gql } from '@apollo/client'
import * as ApolloReactHooks from '@apollo/client/react'

const defaultOptions = {} as const
export type GetPaymentsQueryVariables = Types.Exact<{
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortDirection?: Types.InputMaybe<Types.SortDirection>
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>
}>

export type GetPaymentsQuery = {
  __typename?: 'Query'
  getPayments: {
    __typename?: 'PaymentsPaginationModel'
    pageSize: number
    pagesCount: number
    page: number
    totalCount: number
    items: Array<{
      __typename?: 'SubscriptionPaymentsModel'
      id?: number | null
      userId?: number | null
      amount?: number | null
      paymentMethod: Types.PaymentMethod
      type: Types.SubscriptionType
      currency?: Types.CurrencyType | null
      createdAt?: ISOStringFormat | null
      userName: string
      avatars?: Array<{ __typename?: 'Avatar'; url?: string | null }> | null
    }>
  }
}

export const GetPaymentsDocument = gql`
  query GetPayments(
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
    $searchTerm: String
  ) {
    getPayments(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
    ) {
      pageSize
      pagesCount
      page
      totalCount
      items {
        id
        userId
        amount
        paymentMethod
        type
        currency
        createdAt
        userName
        avatars {
          url
        }
      }
    }
  }
`

/**
 * __useGetPaymentsQuery__
 *
 * To run a query within a React component, call `useGetPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useGetPaymentsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(
    GetPaymentsDocument,
    options,
  )
}
export function useGetPaymentsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(
    GetPaymentsDocument,
    options,
  )
}
export function useGetPaymentsSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useSuspenseQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(
    GetPaymentsDocument,
    options,
  )
}
export type GetPaymentsQueryHookResult = ReturnType<typeof useGetPaymentsQuery>
export type GetPaymentsLazyQueryHookResult = ReturnType<typeof useGetPaymentsLazyQuery>
export type GetPaymentsSuspenseQueryHookResult = ReturnType<typeof useGetPaymentsSuspenseQuery>