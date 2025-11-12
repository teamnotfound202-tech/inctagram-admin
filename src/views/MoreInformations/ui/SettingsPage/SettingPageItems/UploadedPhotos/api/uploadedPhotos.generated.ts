import * as Types from '../../../../../../../shared/graphql/__generated__/graphql'
import { gql } from '@apollo/client'
import * as ApolloReactHooks from '@apollo/client/react'

const defaultOptions = {} as const
export type GetUploadPhotosByUserQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input']
  endCursorId?: Types.InputMaybe<Types.Scalars['Int']['input']>
}>

export type GetUploadPhotosByUserQuery = {
  __typename?: 'Query'
  getPostsByUser: {
    __typename?: 'PostsByUserModel'
    pagesCount: number
    pageSize: number
    totalCount: number
    items?: Array<{ __typename?: 'ImagePost'; id?: number | null; url?: string | null }> | null
  }
}

export const GetUploadPhotosByUserDocument = gql`
  query GetUploadPhotosByUser($userId: Int!, $endCursorId: Int) {
    getPostsByUser(userId: $userId, endCursorId: $endCursorId) {
      pagesCount
      pageSize
      totalCount
      items {
        id
        url
      }
    }
  }
`

/**
 * __useGetUploadPhotosByUserQuery__
 *
 * To run a query within a React component, call `useGetUploadPhotosByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUploadPhotosByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUploadPhotosByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      endCursorId: // value for 'endCursorId'
 *   },
 * });
 */
export function useGetUploadPhotosByUserQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetUploadPhotosByUserQuery,
    GetUploadPhotosByUserQueryVariables
  > &
    ({ variables: GetUploadPhotosByUserQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<GetUploadPhotosByUserQuery, GetUploadPhotosByUserQueryVariables>(
    GetUploadPhotosByUserDocument,
    options,
  )
}
export function useGetUploadPhotosByUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUploadPhotosByUserQuery,
    GetUploadPhotosByUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetUploadPhotosByUserQuery,
    GetUploadPhotosByUserQueryVariables
  >(GetUploadPhotosByUserDocument, options)
}
export function useGetUploadPhotosByUserSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetUploadPhotosByUserQuery,
        GetUploadPhotosByUserQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useSuspenseQuery<
    GetUploadPhotosByUserQuery,
    GetUploadPhotosByUserQueryVariables
  >(GetUploadPhotosByUserDocument, options)
}
export type GetUploadPhotosByUserQueryHookResult = ReturnType<typeof useGetUploadPhotosByUserQuery>
export type GetUploadPhotosByUserLazyQueryHookResult = ReturnType<
  typeof useGetUploadPhotosByUserLazyQuery
>
export type GetUploadPhotosByUserSuspenseQueryHookResult = ReturnType<
  typeof useGetUploadPhotosByUserSuspenseQuery
>