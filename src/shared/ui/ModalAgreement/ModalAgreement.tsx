'use client'
import { AlertToast, Input, Modal, SelectBox } from '@/shared/ui'
import { Button } from '@/shared/ui'
import s from './ModalAgreement.module.scss'
import { AgreementsType } from '@/shared/shared-types'
import { useState } from 'react'
import { useBanUserMutation } from '@/views/PostsListPage/api/banUser.generated'
import { changeBanUserInCache } from '@/shared/lib'
import { useUnbanUserMutation } from '@/views/PostsListPage/api/unbanUser.generated'
import { toast } from 'sonner'
import { updateBanStatusUsersList } from '@/shared/lib/utils/updateBanStatusUsersList'

type Props = {
  isOpen: boolean
  type: AgreementsType
  userName: string
  userId: number
  handleCloseAgreementModalAction: (value: boolean) => void
}

export const ModalAgreement = ({
  type,
  userName,
  userId,
  handleCloseAgreementModalAction,
  isOpen,
}: Props) => {
  const [banUserFunc, { loading: loadingBun }] = useBanUserMutation({
    update(cache, { data }, { variables }) {
      if (!data || !variables) return
      changeBanUserInCache(cache, { userId: variables.userId, banReason: variables.banReason })
      updateBanStatusUsersList(cache, { userId: variables.userId, banReason: variables.banReason })
    },
  })
  const [unbanUserFunc, { loading: loadingUnBun }] = useUnbanUserMutation({
    update(cache, { data }, { variables }) {
      if (!data || !variables) return
      changeBanUserInCache(cache, { userId: variables.userId })
      updateBanStatusUsersList(cache, { userId: variables.userId })
    },
  })

  const [banValue, setBanValue] = useState('')
  const [anotherValue, setAnotherValue] = useState('')
  const loading = loadingBun || loadingUnBun

  const handleCloseModal = () => {
    setBanValue('')
    setAnotherValue('')
    handleCloseAgreementModalAction(false)
  }

  const handleBanUser = async () => {
    await banUserFunc({
      variables: { userId, banReason: banValue === 'Another reason' ? anotherValue : banValue },
    }).catch((err) => {
      toast.custom(() => (
        <AlertToast
          variant="error"
          title={`Ошибка бана пользователя ${userId}`}
          description={err.message}
        />
      ))
    })
    handleCloseModal()
  }

  const handleUnBanUser = async () => {
    await unbanUserFunc({ variables: { userId } }).catch((err) => {
      toast.custom(() => (
        <AlertToast
          variant="error"
          title={`Ошибка разбана пользователя ${userId}`}
          description={err.message}
        />
      ))
    })
    handleCloseModal()
  }

  const changeTypeTitle = (type: AgreementsType) => {
    let title
    let text
    switch (type) {
      case 'ban':
        title = 'Ban user'
        text = `Are you sure to ban this user, ${userName}?`
        break
      case 'unban':
        title = 'Un-Ban user'
        text = `Are you sure want to un-ban ${userName}?`
        break
      default:
        title = ''
        text = ''
    }
    return { title, text }
  }

  return (
    <Modal isOpen={isOpen} title={changeTypeTitle(type).title} onClick={handleCloseModal}>
      <div className={s.contentAgreementModal}>
        <p className={s.textAgreementModal}>{changeTypeTitle(type).text}</p>
        {type === 'ban' && (
          <SelectBox
            options={[
              { value: 'Bad behavior', label: 'Bad behavior' },
              { value: 'Advertising placement', label: 'Advertising placement' },
              { value: 'Another reason', label: 'Another reason' },
            ]}
            name={'select ban'}
            defaultValue={''}
            fullWidth={true}
            placeholder={'Reason for ban'}
            onValueChange={setBanValue}
          />
        )}
        {type === 'ban' && banValue === 'Another reason' && (
          <Input
            id={'banUser'}
            type={'text'}
            value={anotherValue}
            onChange={(e) => setAnotherValue(e.target.value)}
          />
        )}
        <div className={s.btnWrapperAgreementModal}>
          <Button
            className={s.btnAgreementModal}
            variant={'primary'}
            onClick={handleCloseModal}
            disabled={(!banValue && type === 'ban') || loading}
          >
            No
          </Button>
          <Button
            className={s.btnAgreementModal}
            variant={'outline'}
            onClick={type === 'ban' ? handleBanUser : handleUnBanUser}
            disabled={(!banValue && type === 'ban') || loading}
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  )
}
