import * as Types from '../../../shared/graphql/__generated__/graphql'

import { ISOStringFormat } from 'date-fns'
import { gql } from '@apollo/client'
import * as ApolloReactHooks from '@apollo/client/react'

const defaultOptions = {} as const
export type GetUserFollowersQueryVariables = Types.Exact<{
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortDirection?: Types.InputMaybe<Types.SortDirection>
  userId: Types.Scalars['Int']['input']
}>

export type GetUserFollowersQuery = {
  __typename?: 'Query'
  getFollowers: {
    __typename?: 'FollowPaginationModel'
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<{
      __typename?: 'Follow'
      id: number
      userId: number
      userName?: string | null
      firstName?: string | null
      lastName?: string | null
      createdAt: ISOStringFormat
    }>
  }
}

export const GetUserFollowersDocument = gql`
  query GetUserFollowers(
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
    $userId: Int!
  ) {
    getFollowers(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      userId: $userId
    ) {
      pagesCount
      page
      pageSize
      totalCount
      items {
        id
        userId
        userName
        firstName
        lastName
        createdAt
      }
    }
  }
`

/**
 * __useGetUserFollowersQuery__
 *
 * To run a query within a React component, call `useGetUserFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFollowersQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserFollowersQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetUserFollowersQuery,
    GetUserFollowersQueryVariables
  > &
    ({ variables: GetUserFollowersQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<GetUserFollowersQuery, GetUserFollowersQueryVariables>(
    GetUserFollowersDocument,
    options,
  )
}
export function useGetUserFollowersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUserFollowersQuery,
    GetUserFollowersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<GetUserFollowersQuery, GetUserFollowersQueryVariables>(
    GetUserFollowersDocument,
    options,
  )
}
export type GetUserFollowersQueryHookResult = ReturnType<typeof useGetUserFollowersQuery>
export type GetUserFollowersLazyQueryHookResult = ReturnType<typeof useGetUserFollowersLazyQuery>