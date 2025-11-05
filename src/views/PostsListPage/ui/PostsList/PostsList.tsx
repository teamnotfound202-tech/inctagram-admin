'use client'
import s from './PostsList.module.scss'
import { PostItem } from '@/views/PostsListPage/ui/PostsList/PostItem/PostItem'
import { useGetPostsQuery } from '@/views/PostsListPage/api/getPosts.generated'
import { useCallback, useEffect, useRef, useState } from 'react'
import Spinner from '@/shared/ui/Spinner/Spinner'

export const pageSize = 10


export const PostsList = ({value}: {value: string}) => {
  const listsRef = useRef(null)
  const {data, fetchMore} = useGetPostsQuery({variables: {
      endCursorPostId: 0,
      searchTerm: value,
    }},
  )
  const [currentCount, setCurrentCount] = useState(1)
  const isNextPage = data && currentCount < data.getPosts.pagesCount

  const handleNextPosts = useCallback(() => {
    if (data) {
      const id = data?.getPosts.items[data.getPosts.items.length - 1].id
      if (isNextPage && id) {
        fetchMore({
          variables: { endCursorPostId: id, searchTerm: value },
        })
        setCurrentCount((perCount)=> perCount + 1)
      }
    }
  }, [data, fetchMore, isNextPage, value])


  useEffect(() => {
    const observer = new IntersectionObserver((arrElements) => {
      if(arrElements[0] && arrElements[0].isIntersecting) {
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
      {isNextPage && <div ref={listsRef}><Spinner type="secondary" size={16} label={'Loading...'} fullWidth center /></div>}
    </>
  )
}