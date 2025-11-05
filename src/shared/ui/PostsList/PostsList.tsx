'use client'
import s from './PostsList.module.scss'
import { PostItem } from '@/shared/ui/PostsList/PostItem/PostItem'
import { useGetPostsQuery } from '@/views/PostsListPage/api/getPosts.generated'
import { useCallback, useEffect, useRef, useState } from 'react'

export const pageSize = 10


export const PostsList = () => {
  const listsRef = useRef(null)
  const {data, fetchMore, loading} = useGetPostsQuery({variables: {
      endCursorPostId: 0,
      searchTerm: '',
      pageSize: pageSize,
      sortBy: 'createdA',
    }},
  )
  const [currentCount, setCurrentCount] = useState(1)
  const isNextPage = data && currentCount < data.getPosts.pagesCount

  const handleNextPosts = useCallback(() => {
    if (data){
      const id = data?.getPosts.items[data.getPosts.items.length - 1].id
      if (isNextPage && id) {
        fetchMore({
          variables: { endCursorPostId: id, pageSize: pageSize },
        })
        setCurrentCount((perCount)=> perCount + 1)
      }
    }
  }, [data, fetchMore, isNextPage])


  useEffect(() => {
    const observer = new IntersectionObserver(el => {
      if(el[0] && el[0].isIntersecting) {
        handleNextPosts()
      }
    },
    {
      root: null, // Отслеживание относительно окна браузера (viewport). null = весь экран
      rootMargin: '100px', // Начинать загрузку до появления элемента
      threshold: 0.1
    })

    const currentObserverRef = listsRef.current
    if (currentObserverRef) {
      observer.observe(currentObserverRef)
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef)
      }
    }
  }, [handleNextPosts])

  return (
    <>
      <ul className={s.userPostsList}>
        {data?.getPosts.items.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
      {!data?.getPosts.items || (data?.getPosts.items.length === 0 && <div>No posts</div>)}
      {loading && <div className={s.loader}>Load more posts</div>}
      {isNextPage && <div ref={listsRef}><p>get more posts ...</p></div>}
    </>
  )
}