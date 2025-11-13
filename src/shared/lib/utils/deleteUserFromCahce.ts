import { ApolloCache } from '@apollo/client'



export function deleteUserFromCache(
  cache: ApolloCache,
  { userId }: {userId: number},
) {
  // 1. Находим normalized id пользователя в кеше
  const cacheId = cache.identify({
    __typename: 'User',
    id: userId,
  })

  if (!cacheId) return
  cache.evict({id:cacheId})
  cache.gc()
}
