import { useState } from 'react'
import type { AgreementsType } from '@/shared/shared-types'

export const useHandleModals = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenAgreementModal, setIsOpenAgreementModal] = useState(false)
  const [typeModalAgreement, setTypeModalAgreement] = useState<AgreementsType>('ban')

  const handleChangeModal = (value: boolean) => {
    setIsOpen(value)
  }

  const handleOpenAgreementModal = (value: boolean, type: AgreementsType) => {
    setIsOpenAgreementModal(value)
    setTypeModalAgreement(type)
    setIsOpen(!value)
  }

  const handleCloseAgreementModal = (value: boolean) => {
    setIsOpenAgreementModal(value)
  }

  return {
    isOpen,
    isOpenAgreementModal,
    typeModalAgreement,
    handleChangeModal,
    handleCloseAgreementModal,
    handleOpenAgreementModal
  }
}