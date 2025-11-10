import * as Types from '../../../shared/graphql/__generated__/graphql';

import { ISOStringFormat } from 'date-fns';
import { gql } from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetUsersQueryVariables = Types.Exact<{
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>;
  statusFilter?: Types.InputMaybe<Types.UserBlockStatus>;
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'UsersPaginationModel', users: Array<{ __typename?: 'User', id: number, userName: string, createdAt: ISOStringFormat, email: string, profile: { __typename?: 'Profile', id: number, createdAt: ISOStringFormat }, userBan?: { __typename?: 'UserBan', reason: string, createdAt: ISOStringFormat } | null }>, pagination: { __typename?: 'PaginationModel', totalCount: number, pagesCount: number, page: number } } };


export const GetUsersDocument = gql`
    query GetUsers($pageSize: Int = 10, $pageNumber: Int = 1, $sortBy: String = "createdAt", $sortDirection: SortDirection = desc, $searchTerm: String, $statusFilter: UserBlockStatus = ALL) {
  getUsers(
    pageSize: $pageSize
    pageNumber: $pageNumber
    sortBy: $sortBy
    sortDirection: $sortDirection
    searchTerm: $searchTerm
    statusFilter: $statusFilter
  ) {
    users {
      id
      userName
      createdAt
      email
      profile {
        id
        createdAt
      }
      userBan {
        reason
        createdAt
      }
    }
    pagination {
      totalCount
      pagesCount
      page
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *      searchTerm: // value for 'searchTerm'
 *      statusFilter: // value for 'statusFilter'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;