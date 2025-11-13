// updateBanStatusUsersList.ts
import { ApolloCache } from '@apollo/client'

type BanUserCachePayload = {
  userId: number
  banReason?: string | null
}

export function updateBanStatusUsersList(
  cache: ApolloCache,
  { userId, banReason }: BanUserCachePayload,
) {
  // 1. Находим normalized id пользователя в кеше
  const cacheId = cache.identify({
    __typename: 'User',
    id: userId,
  })

  if (!cacheId) return

  // 2. Меняем поле userBan у этого пользователя
  cache.modify({
    id: cacheId,
    fields: {
      userBan() {
        // если нет причины -> считаем, что анбан
        if (!banReason) {
          return null
        }

        return {
          __typename: 'UserBan',
          reason: banReason,
        }
      },
    },
  })
}
