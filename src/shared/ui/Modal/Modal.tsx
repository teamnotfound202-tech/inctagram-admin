import type { ReactNode, MouseEvent } from 'react'
import CloseBtnIcon from './icons/close.svg'
import s from './Modal.module.scss'

type Props = {
  isOpen: boolean
  title: string
  children: ReactNode
  onClick: () => void
}

export const Modal = ({ title, children, onClick, isOpen }: Props) => {
  if (!isOpen) return null
  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }
  return (
    <div className={s.overlay} onClick={onClick}>
      <div className={s.modal} onClick={handleContentClick}>

        <div className={s.modalTop}>
          <h3 className={s.modalTitle}>{title}</h3>
          <button className={s.modalCloseBtn} onClick={onClick}>
            <CloseBtnIcon className={s.closeBtnIcon} />
          </button>
        </div>

        <div className={s.modalContent}>{children}</div>
      </div>
    </div>
  )
}
