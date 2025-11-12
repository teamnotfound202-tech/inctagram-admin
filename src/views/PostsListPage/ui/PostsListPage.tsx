'use client';

import { Input, PostsList } from '@/shared/ui'
import s from './PostsListPage.module.scss'
import { useEffect, useState } from 'react'
import { useGetPostsQuery } from '@/views/PostsListPage/api/getPosts.generated'
import { useDebounce } from '@/shared/lib/utils/useDebounce'

export const PostsListPage = () => {
  const [value, setValue] = useState('')
  const debounceValue= useDebounce(value,750)
  const [cursorId, setCursorId] = useState(0)
  const {refetch} = useGetPostsQuery({variables: {
      endCursorPostId: cursorId,
      searchTerm: value,
    }},
  )

  useEffect(() => {
    refetch({searchTerm: debounceValue, endCursorPostId: 0})
  }, [debounceValue, refetch])

  const changeCursorId = (value: number) => setCursorId(value)
  return (
    <div className={s.postsListPage}>
      <Input
      id={'inputSearch'}
      className={s.postsListPageSearchInput}
      type="search"
      placeholder={'Search in username'}
      onChange={(e) =>  setValue(e.target.value)}
      value={value}
    />
      <PostsList value={value}  cursorId={cursorId} changeCursorIdAction={changeCursorId}/>
    </div>
  )
}