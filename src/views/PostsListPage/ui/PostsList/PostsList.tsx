'use client'
import s from './PostsList.module.scss'
import { PostItem } from '@/views/PostsListPage/ui/PostsList/PostItem/PostItem'
import { useGetPostsQuery } from '@/views/PostsListPage/api/getPosts.generated'
import { useCallback, useState } from 'react'
import Spinner from '@/shared/ui/Spinner/Spinner'
import { usePostAddedSubscription } from '@/views/PostsListPage/api/postAdded.generated'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll'

type Props = {
  value: string
  cursorId: number
  changeCursorIdAction: (value: number) => void
}

export const PostsList = ({
  value,
  cursorId,
  changeCursorIdAction
}: Props) => {
  const [postsLoading, setPostsLoading] = useState(false)
  const { data, fetchMore} = useGetPostsQuery({
    variables: {
      endCursorPostId: cursorId,
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
      if (isNextPage && id && id !== cursorId) {
        setPostsLoading(true)
        fetchMore({
          variables: { endCursorPostId: id, searchTerm: value },
        }).finally(() =>{
          setPostsLoading(false)
        })
        changeCursorIdAction(id)
        setCurrentCount((perCount) => perCount + 1)
      }
    }
  }, [data, fetchMore, isNextPage, value, changeCursorIdAction, cursorId])

  const listsRef = useInfiniteScroll({ func: handleNextPosts })

  return (
    <>
      <ul className={s.userPostsList}>
        {data?.getPosts.items.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
      {!data?.getPosts.items || (data?.getPosts.items.length === 0 && <div>No posts</div>)}
      {(isNextPage && !postsLoading) && (
        <div ref={listsRef}>
          <Spinner type="secondary" size={16} label={'Loading...'} fullWidth center />
        </div>
      )}
    </>
  )
}
