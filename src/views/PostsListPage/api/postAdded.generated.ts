import * as Types from '../../../shared/graphql/__generated__/graphql';

import { ISOStringFormat } from 'date-fns';
import { gql } from '@apollo/client';

import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type PostAddedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type PostAddedSubscription = { __typename?: 'Subscription', postAdded: { __typename?: 'Post', id: number, ownerId: number, description: string, createdAt: ISOStringFormat, updatedAt: ISOStringFormat, postOwner: { __typename?: 'PostOwnerModel', id: number, userName: string }, userBan?: { __typename?: 'UserBan', createdAt: ISOStringFormat, reason: string } | null, images?: Array<{ __typename?: 'ImagePost', url?: string | null }> | null } };


export const PostAddedDocument = gql`
    subscription PostAdded {
  postAdded {
    id
    ownerId
    description
    createdAt
    updatedAt
    postOwner {
      id
      userName
    }
    userBan {
      createdAt
      reason
    }
    images {
      url
    }
  }
}
    `;

/**
 * __usePostAddedSubscription__
 *
 * To run a query within a React component, call `usePostAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePostAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePostAddedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<PostAddedSubscription, PostAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<PostAddedSubscription, PostAddedSubscriptionVariables>(PostAddedDocument, options);
      }
export type PostAddedSubscriptionHookResult = ReturnType<typeof usePostAddedSubscription>;