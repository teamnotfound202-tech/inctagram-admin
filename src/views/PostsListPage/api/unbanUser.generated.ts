import * as Types from '../../../shared/graphql/__generated__/graphql'
import { gql } from '@apollo/client'
import * as ApolloReactHooks from '@apollo/client/react'

const defaultOptions = {} as const
export type UnbanUserMutationVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input']
}>

export type UnbanUserMutation = { __typename?: 'Mutation'; unbanUser: boolean }

export const UnbanUserDocument = gql`
  mutation UnbanUser($userId: Int!) {
    unbanUser(userId: $userId)
  }
`

/**
 * __useUnbanUserMutation__
 *
 * To run a mutation, you first call `useUnbanUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnbanUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unbanUserMutation, { data, loading, error }] = useUnbanUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnbanUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UnbanUserMutation, UnbanUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<UnbanUserMutation, UnbanUserMutationVariables>(
    UnbanUserDocument,
    options,
  )
}
export type UnbanUserMutationHookResult = ReturnType<typeof useUnbanUserMutation>