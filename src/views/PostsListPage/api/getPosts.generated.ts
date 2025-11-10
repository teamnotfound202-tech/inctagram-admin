import * as Types from '../../../shared/graphql/__generated__/graphql';

import { ISOStringFormat } from 'date-fns';
import { gql } from '@apollo/client';

import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetPostsQueryVariables = Types.Exact<{
  endCursorPostId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>;
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: { __typename?: 'PostsPaginationModel', pagesCount: number, pageSize: number, totalCount: number, items: Array<{ __typename?: 'Post', ownerId: number, description: string, id: number, createdAt: ISOStringFormat, updatedAt: ISOStringFormat, images?: Array<{ __typename?: 'ImagePost', url?: string | null }> | null, userBan?: { __typename?: 'UserBan', reason: string, createdAt: ISOStringFormat } | null, postOwner: { __typename?: 'PostOwnerModel', id: number, userName: string, lastName?: string | null, avatars?: Array<{ __typename?: 'Avatar', url?: string | null }> | null } }> } };


export const GetPostsDocument = gql`
    query GetPosts($endCursorPostId: Int, $searchTerm: String, $pageSize: Int, $sortBy: String, $sortDirection: SortDirection) {
  getPosts(
    endCursorPostId: $endCursorPostId
    searchTerm: $searchTerm
    pageSize: $pageSize
    sortBy: $sortBy
    sortDirection: $sortDirection
  ) {
    pagesCount
    pageSize
    totalCount
    items {
      images {
        url
      }
      ownerId
      userBan {
        reason
        createdAt
      }
      postOwner {
        id
        userName
        lastName
        avatars {
          url
        }
      }
      description
      id
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      endCursorPostId: // value for 'endCursorPostId'
 *      searchTerm: // value for 'searchTerm'
 *      pageSize: // value for 'pageSize'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export function useGetPostsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsSuspenseQueryHookResult = ReturnType<typeof useGetPostsSuspenseQuery>;