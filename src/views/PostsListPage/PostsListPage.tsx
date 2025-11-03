'use client';

import { Input, PostsList } from '@/shared/ui'
import s from './PostsListPage.module.scss'

export const PostsListPage = () => {
  return (
    <div className={s.postsListPage}>
      <Input
        id={'inputSearch'}
        className={s.postsListPageSearchInput}
        type="search"
        placeholder={'Search'}
        onChange={() => {}}
        value={''}
      />
      <PostsList/>
    </div>
  )
}