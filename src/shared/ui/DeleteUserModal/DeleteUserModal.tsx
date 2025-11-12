import * as React from 'react'
import { AlertToast, Button, Modal } from '@/shared/ui'
import s from '@/shared/ui/ModalAgreement/ModalAgreement.module.scss'
import { useDeleteUsersMutation } from '@/views/UsersList/api/userList.generated'
import { toast } from 'sonner'
import { deleteUserFromCache } from '@/shared/lib/utils/deleteUserFromCahce'

type Props = {
  isOpen: boolean
  userName: string
  userId: number
  modalHandler: (val:boolean) => void
}
export const DeleteUserModal = ({
  userId,
  isOpen,
  userName,
  modalHandler,
}: Props) => {
  const [deleteUser, {loading}] = useDeleteUsersMutation(
    {update(cache,{data},{variables}){
        if (!data?.removeUser || !variables) return
        deleteUserFromCache(cache,{userId:variables.userId})
    }})
  const handleCloseModal = () =>{
    modalHandler(false)
  }

  console.log("deleteUser")
  const deleteUserHandler = () =>{
    deleteUser({variables:{userId}})
      .then(() => {handleCloseModal()})
      .catch(() => {
        toast.custom(() => (
          <AlertToast variant="error" title='Ошибка удвления' description='При удалении пользователя возникла ошибка...' />
        ))
      })
  }


  return (
    <Modal isOpen={isOpen} title={'Delete user'} onClick={handleCloseModal}>
      <div className={s.contentAgreementModal}>
        <p className={s.textAgreementModal}>{`Are you sure to delete user ${userName}?`}</p>
        <div className={s.btnWrapperAgreementModal}>
          <Button
            className={s.btnAgreementModal}
            variant={'primary'}
            onClick={handleCloseModal}
            disabled={loading}
          >
            No
          </Button>
          <Button
            className={s.btnAgreementModal}
            variant={'outline'}
            onClick={deleteUserHandler}
            disabled={loading}
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  )
}
