import * as Types from '../../../shared/graphql/__generated__/graphql'

import { ISOStringFormat } from 'date-fns'
import { gql } from '@apollo/client'
import * as ApolloReactHooks from '@apollo/client/react'

const defaultOptions = {} as const
export type GetUserFollowingQueryVariables = Types.Exact<{
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>
  sortDirection?: Types.InputMaybe<Types.SortDirection>
  userId: Types.Scalars['Int']['input']
}>

export type GetUserFollowingQuery = {
  __typename?: 'Query'
  getFollowing: {
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

export const GetUserFollowingDocument = gql`
  query GetUserFollowing(
    $pageSize: Int
    $pageNumber: Int
    $sortBy: String
    $sortDirection: SortDirection
    $userId: Int!
  ) {
    getFollowing(
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
 * __useGetUserFollowingQuery__
 *
 * To run a query within a React component, call `useGetUserFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFollowingQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserFollowingQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetUserFollowingQuery,
    GetUserFollowingQueryVariables
  > &
    ({ variables: GetUserFollowingQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<GetUserFollowingQuery, GetUserFollowingQueryVariables>(
    GetUserFollowingDocument,
    options,
  )
}
export function useGetUserFollowingLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUserFollowingQuery,
    GetUserFollowingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<GetUserFollowingQuery, GetUserFollowingQueryVariables>(
    GetUserFollowingDocument,
    options,
  )
}

export type GetUserFollowingQueryHookResult = ReturnType<typeof useGetUserFollowingQuery>
export type GetUserFollowingLazyQueryHookResult = ReturnType<typeof useGetUserFollowingLazyQuery>