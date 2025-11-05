'use client'

import s from './PostItem.module.scss'
import 'swiper/css'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/shared/ui'
import { LinkContent } from '@/views/PostsListPage/ui/PostsList/PostItem/LinkContent/LinkContent'
import Avatar from '@/shared/ui/Avatar/Avatar'
import { getTimeDifference } from '@/shared/lib'
import BanIcon from './icons/ban.svg'
import { Post } from '@/shared/graphql/__generated__/graphql'

type Props = {
  post: Post
}

const countLetter = 82
const maxLetters = 210

export const PostItem = ({ post }: Props) => {
  const [text, setText] = useState('Show more')

  const postDescriptionLength =
    post && post.description && post.description.length > countLetter
      ? post.description.slice(0, countLetter) + '...'
      : post.description
  const [textDescription, setTextDescription] = useState(postDescriptionLength)

  const handleChangeHeightText = (value?: number) => {
    if (value) {
      setTimeout(() => {
        setTextDescription(post.description.slice(0, value) + '...')
      }, 390)
    } else {
      setTextDescription(post.description.slice(0, countLetter) + '...')
    }
  }
  const url = post?.postOwner && post?.postOwner?.avatars && post?.postOwner?.avatars[0]?.url
  return (
    <li className={s.postItem}>
      <div className={s.postImageWraper}>
        <Link href={`/profile/${post.ownerId}/post/${post.id}`}>
          <LinkContent post={post} isTrim={text} />
        </Link>
      </div>

      <div className={s.userInfoWrapper}>
        <div className={s.userInfo}>
          <Avatar src={url} alt="Avatar Image" size="small" />
          <p className={s.userName}>
            <span className={s.userName}>{post.postOwner.userName}</span>
          </p>
        </div>
        <button className={s.userInfoBtn} onClick={() => {}}>
          <BanIcon/>
        </button>
      </div>

      <span className={s.time}>{getTimeDifference(post.createdAt)}</span>

      <p className={s.description}>
        {textDescription}
        {textDescription.length > countLetter && (
          <Button
            variant={'text'}
            className={s.showMoreButton}
            onClick={() => {
              if (text === 'Show more') {
                handleChangeHeightText(maxLetters)
                setText('Show less')
              } else {
                handleChangeHeightText()
                setText('Show more')
              }
            }}
          >
            {text}
          </Button>
        )}
      </p>
    </li>
  )
}
