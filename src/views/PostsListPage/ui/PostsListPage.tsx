'use client';

import { Input, PostsList } from '@/shared/ui'
import s from './PostsListPage.module.scss'
import { useEffect, useState } from 'react'
import { useGetPostsQuery } from '@/views/PostsListPage/api/getPosts.generated'

export const PostsListPage = () => {
  const [value, setValue] = useState('')
  const [valueDebounced, setValueDebounced] = useState(value)
  const {refetch} = useGetPostsQuery({variables: {
      endCursorPostId: 0,
      searchTerm: value,
    }},
  )

  useEffect(() => {
    const timerId = setTimeout(() => {
        setValueDebounced(value)
      }, 500);
      return () => {
        clearTimeout(timerId);
      }
  }, [value])

  useEffect(() => {
    refetch({searchTerm: valueDebounced, endCursorPostId: 0})
  }, [valueDebounced, refetch])

  return (
    <div className={s.postsListPage}>
      <Input
      id={'inputSearch'}
      className={s.postsListPageSearchInput}
      type="search"
      placeholder={'Search'}
      onChange={(e) =>  setValue(e.target.value)}
      value={value}
    />
      <PostsList value={value}/>
    </div>
  )
}