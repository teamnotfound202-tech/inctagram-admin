import { Modal, SelectBox } from '@/shared/ui'
import {Button} from '@/shared/ui'
import s from './ModalAgreement.module.scss'
import {AgreementsType} from '@/shared/shared-types'


type Props = {
    type: AgreementsType
    userName: string
    handleCloseAgreementModal: (value: boolean) => void
    onClick: () => void
    onValueChange:(value: string) => void
    disabled?: boolean
}

export const ModalAgreement = ({
   type,
   userName,
   handleCloseAgreementModal,
   onClick,
   onValueChange,
   disabled
}: Props) => {

    const changeTypeTitle = (type: AgreementsType) => {
        let title
        let text
        switch (type) {
            case 'ban':
                title = 'Ban user'
                text = `Are you sure to ban this user, ${userName}?`
                break;
            case 'delete':
                title = 'Delete user'
                text = `Are you sure to delete user, ${userName}?`
                break;
            case 'unban':
                title = 'Un-Ban user'
                text = `Are you sure want to un-ban ${userName}?`
                break
            default:
                title = ''
                text = ''
        }
        return {title, text}
    }

    return (
        <Modal
            title={changeTypeTitle(type).title}
            onClick={() => handleCloseAgreementModal(false)}
        >
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
                        onValueChange={onValueChange}
                    />
                )}
                <div className={s.btnWrapperAgreementModal}>
                    <Button className={s.btnAgreementModal} variant={'primary'} onClick={() => handleCloseAgreementModal(false)} disabled={disabled}>No</Button>
                    <Button className={s.btnAgreementModal} variant={'outline'} onClick={onClick} disabled={disabled}>Yes</Button>
                </div>
            </div>
        </Modal>
    )
}