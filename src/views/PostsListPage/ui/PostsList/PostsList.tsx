'use client'
import s from './PostsList.module.scss'
import { PostItem } from '@/views/PostsListPage/ui/PostsList/PostItem/PostItem'
import { useGetPostsQuery } from '@/views/PostsListPage/api/getPosts.generated'
import { useCallback, useState } from 'react'
import Spinner from '@/shared/ui/Spinner/Spinner'
import { usePostAddedSubscription } from '@/views/PostsListPage/api/postAdded.generated'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll'

export const PostsList = ({ value }: { value: string }) => {
  const { data, fetchMore, refetch } = useGetPostsQuery({
    variables: {
      endCursorPostId: 0,
      searchTerm: value,
    },
  })

  usePostAddedSubscription({
    // через client полчучаем доступ к кешу через data данные полученные по подписке через ws
    onData: ({ data, client }) => {
      const newPost = data?.data?.postAdded
      if (!newPost) return
      // Добавление нового элемента в кэш
      client.cache.modify({
        fields: {
          getPosts(existing) {
            return { ...existing, items: [newPost, ...(existing.items ?? [])] }
          },
        },
      })
    },
  })

  const [currentCount, setCurrentCount] = useState(1)
  const isNextPage = data && currentCount < data.getPosts.pagesCount

  const handleNextPosts = useCallback(() => {
    if (data) {
      const id = data?.getPosts.items[data.getPosts.items.length - 1].id
      if (isNextPage && id) {
        fetchMore({
          variables: { endCursorPostId: id, searchTerm: value },
        })
        setCurrentCount((perCount) => perCount + 1)
      }
    }
  }, [data, fetchMore, isNextPage, value])

  const listsRef = useInfiniteScroll({ func: handleNextPosts })

  const refetchOnPosts = () => refetch()

  return (
    <>
      <ul className={s.userPostsList}>
        {data?.getPosts.items.map((post) => (
          <PostItem key={post.id} post={post} refetchOnPostsAction={refetchOnPosts}/>
        ))}
      </ul>
      {!data?.getPosts.items || (data?.getPosts.items.length === 0 && <div>No posts</div>)}
      {isNextPage && (
        <div ref={listsRef}>
          <Spinner type="secondary" size={16} label={'Loading...'} fullWidth center />
        </div>
      )}
    </>
  )
}