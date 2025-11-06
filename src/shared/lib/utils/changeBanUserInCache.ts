import { ApolloCache } from '@apollo/client'
import { Post } from '@/shared/graphql'

export function changeBanUserInCache(
  cache: ApolloCache,
  ownerId: number,
  banUser: boolean | undefined
) {
  cache.modify({
    fields: {
      getPosts(existing) {
        if (!existing?.items) return existing
        // Изменяем посты с данным ownerId
        const newItems = existing.items.filter((u: Post) => banUser ? u.id !== ownerId : u)
        // записываем обратно
        cache.modify({
          fields: {
            getPosts(existing) {
              return { ...existing, items: newItems }
            },
          },
        })
      },
    },
  })
}