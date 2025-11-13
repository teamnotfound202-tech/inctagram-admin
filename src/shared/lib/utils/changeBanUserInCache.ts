import { ApolloCache } from '@apollo/client'
import {
  GetPostsDocument,
  GetPostsQuery,
  GetPostsQueryVariables,
} from '@/views/PostsListPage/api/getPosts.generated'
import { ISOStringFormat } from 'date-fns'

type UserBan = {
  userId: number,
  banReason?: string
}


export function changeBanUserInCache(
  cache: ApolloCache,
  variables: UserBan
) {
  const vars: GetPostsQueryVariables = {
    searchTerm: '',
    endCursorPostId: 0,
  };

  const existing: GetPostsQuery | null = cache.readQuery<GetPostsQuery, GetPostsQueryVariables>({
    query: GetPostsDocument,
    variables: vars,
  }) ?? null;

  if (!existing) return
  cache.writeQuery<GetPostsQuery, GetPostsQueryVariables>({
    query: GetPostsDocument,
    variables: vars,
    data: {
      ...existing,
      getPosts: {
        ...existing.getPosts,
        // например, пометить бан во всех постах пользователя:
        items: existing.getPosts.items.map(p => {
            if (p.ownerId === variables?.userId) {
              return {
                ...p,
                userBan: variables.banReason ? {
                  __typename: 'UserBan',
                  createdAt: (new Date()).toISOString() as ISOStringFormat,
                  reason: variables.banReason
                } : null
              }
            }
            return p
          }
        ),
      },
    },
  });
}