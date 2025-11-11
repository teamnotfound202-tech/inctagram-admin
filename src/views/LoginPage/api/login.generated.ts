import * as Types from '../../../shared/graphql/__generated__/graphql'
import { gql } from '@apollo/client'
import * as ApolloReactHooks from '@apollo/client/react'

const defaultOptions = {} as const
export type LogInMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input']
  password: Types.Scalars['String']['input']
}>

export type LogInMutation = {
  __typename?: 'Mutation'
  loginAdmin: { __typename?: 'LoginAdmin'; logged: boolean }
}

export const LogInDocument = gql`
  mutation LogIn($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      logged
    }
  }
`

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLogInMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LogInMutation, LogInMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, options)
}
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>