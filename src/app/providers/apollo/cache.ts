import {InMemoryCache} from '@apollo/client-integration-nextjs'

export const cache = new InMemoryCache({
  typePolicies: {
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
        getPostsByUser: {
          keyArgs: ['userId'],
          merge(existing, incoming, { args }) {

            if (!existing || !args?.endCursorId || args.endCursorId === 0 ) {
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
