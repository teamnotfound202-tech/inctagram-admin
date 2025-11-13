import * as Types from '../../../shared/graphql/__generated__/graphql'

import { ISOStringFormat } from 'date-fns'
import { gql } from '@apollo/client'
import * as ApolloReactHooks from '@apollo/client/react'

const defaultOptions = {} as const
export type GetPaymentsByUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input']
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortDirection?: Types.InputMaybe<Types.SortDirection>
}>

export type GetPaymentsByUserQuery = {
  __typename?: 'Query'
  getPaymentsByUser: {
    __typename?: 'PaymentPaginationModel'
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<{
      __typename?: 'SubscriptionByPaymentModel'
      id: string
      status: Types.StatusSubscriptionType
      dateOfPayment?: ISOStringFormat | null
      endDate?: ISOStringFormat | null
      type: Types.SubscriptionType
      price: number
      payments: Array<{ __typename?: 'Payment'; id?: number | null }>
    }>
  }
}

export const GetPaymentsByUserDocument = gql`
  query GetPaymentsByUser(
    $userId: Int!
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
  ) {
    getPaymentsByUser(
      pageSize: $pageSize
      pageNumber: $pageNumber
      userId: $userId
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      pagesCount
      page
      pageSize
      totalCount
      items {
        id
        status
        dateOfPayment
        endDate
        type
        price
        payments {
          id
        }
      }
    }
  }
`

/**
 * __useGetPaymentsByUserQuery__
 *
 * To run a query within a React component, call `useGetPaymentsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetPaymentsByUserQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPaymentsByUserQuery,
    GetPaymentsByUserQueryVariables
  > &
    ({ variables: GetPaymentsByUserQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>(
    GetPaymentsByUserDocument,
    options,
  )
}
export function useGetPaymentsByUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentsByUserQuery,
    GetPaymentsByUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<GetPaymentsByUserQuery, GetPaymentsByUserQueryVariables>(
    GetPaymentsByUserDocument,
    options,
  )
}

export type GetPaymentsByUserQueryHookResult = ReturnType<typeof useGetPaymentsByUserQuery>
export type GetPaymentsByUserLazyQueryHookResult = ReturnType<typeof useGetPaymentsByUserLazyQuery>
