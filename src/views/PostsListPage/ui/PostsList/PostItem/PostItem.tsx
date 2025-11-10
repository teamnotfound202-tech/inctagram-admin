'use client'

import s from './PostItem.module.scss'
import 'swiper/css'
import { useState } from 'react'
import { AlertToast, Button, ModalAgreement } from '@/shared/ui'
import { LinkContent } from '@/views/PostsListPage/ui/PostsList/PostItem/LinkContent/LinkContent'
import Avatar from '@/shared/ui/Avatar/Avatar'
import { changeBanUserInCache, getTimeDifference } from '@/shared/lib'
import BanIcon from './icons/ban.svg'
import UnBanIcon from './icons/unban.svg'
import { Post } from '@/shared/graphql/__generated__/graphql'
import { useHandleModals } from '@/shared/lib/hooks/useHandleModals'
import { useBanUserMutation } from '@/views/PostsListPage/api/banUser.generated'
import { useUnbanUserMutation } from '@/views/PostsListPage/api/unbanUser.generated'
import { toast } from 'sonner'

type Props = {
  post: Post
}

const countLetter = 82
const maxLetters = 210

export const PostItem = ({ post }: Props) => {
  const [text, setText] = useState('Show more')
  const [banValue, setBanValue] = useState('')
  const [anotherValue, setAnotherValue] = useState('')
  const [banUserFunc, {loading: loadingBun}] = useBanUserMutation({
    update(cache, {data}, {variables}) {
      if (!data || !variables) return
      changeBanUserInCache(cache, {userId: variables.userId, banReason: variables.banReason})
    }
  })
  const [unbanUserFunc, {loading: loadingUnBun}] = useUnbanUserMutation({
    update(cache, { data }, {variables}) {
      if (!data || !variables) return
      changeBanUserInCache(cache, {userId: variables.userId})
    }
  })
  const {
    handleOpenAgreementModal,
    isOpenAgreementModal,
    handleCloseAgreementModal,
  } = useHandleModals()

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

  const changeBanCause = (value: string) => {
    setBanValue(value)
  }

  const changeAnotherValue = (value: string) => {
    setAnotherValue(value)
  }

  const handleBanUser = async () => {
    await banUserFunc({variables: {userId: post.ownerId, banReason: banValue === 'Another reason' ? anotherValue : banValue}}).catch((err) => {
      toast.custom(() => (
        <AlertToast
          variant="error"
          title={`Ошибка бана пользователя ${post.postOwner.id}`}
          description={err.message}
        />
      ))
    })
    handleCloseAgreementModal(false)
  }

  const handleUnBanUser = async () => {
    await unbanUserFunc({variables: {userId: post.ownerId}}).catch((err) => {
      toast.custom(() => (
        <AlertToast
          variant="error"
          title={`Ошибка разбана пользователя ${post.postOwner.id}`}
          description={err.message}
        />
      ))
    })
    handleCloseAgreementModal(false)
  }

  return (
    <>
      <li className={s.postItem}>
        <div className={s.postImageWraper}>
          <div>
            <LinkContent post={post} isTrim={text} />
          </div>
        </div>

        <div className={s.userInfoWrapper}>
          <div className={s.userInfo}>
            <Avatar src={url} alt="Avatar Image" size="small" />
            <p className={s.userName}>
              <span className={s.userName}>{post.postOwner.userName}</span>
            </p>
          </div>
          {post.userBan ? (
            <button className={s.userInfoBtn} onClick={() => handleOpenAgreementModal(true, 'unban')} disabled={loadingBun|| loadingUnBun}>
              <UnBanIcon/>
            </button>
          ) : (
            <button className={s.userInfoBtn} onClick={() => handleOpenAgreementModal(true, 'ban')} disabled={loadingBun|| loadingUnBun}>
              <BanIcon />
            </button>
          )}
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

        <ModalAgreement
          isOpen={isOpenAgreementModal}
          type={post.userBan ? 'unban' : 'ban'}
          userName={post.postOwner.userName}
          handleCloseAgreementModal={handleCloseAgreementModal}
          onValueChange={changeBanCause}
          onClick={post.userBan ? handleUnBanUser : handleBanUser}
          disabled={loadingBun || (!post.userBan && !banValue)}
          banValue={!post.userBan && banValue}
          changeAnotherValue={changeAnotherValue}
          anotherValue={anotherValue}
        />
    </>
  )
}
