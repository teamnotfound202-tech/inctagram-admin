import {InMemoryCache} from '@apollo/client-integration-nextjs'

export const cache = new InMemoryCache({
  typePolicies: {
    Post: {
      keyFields: ['id'],         // ключ сущности — keyFields говорит кэшу Apollo по какому полю (или набору полей) уникально идентифицировать объект типа
    },
    Query: {
      fields: {
        getPosts: {
          keyArgs: [
            'searchTerm',
            'sortBy',
            'sortDirection'
          ],
          merge(existing, incoming, { args }) {

            if (!existing || !args?.endCursorPostId || args.endCursorPostId === 0 ) {
              return incoming
            }

            return {
              ...incoming,
              items: [
                ...(existing.items || []),
                ...(incoming.items || []),
              ]
            }
          },
        },
      },
    },
  },
})