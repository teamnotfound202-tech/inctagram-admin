'use client'
import Link from 'next/link'
import s from './Header.module.scss'
import FlagRussia from '@/shared/ui/Select/icon/FlagRussia.svg'
import FlagEngland from '@/shared/ui/Select/icon/FlagEngland.svg'
import { Container } from '@/shared/ui'
import { SelectBox } from '@/shared/ui'

export const Header = () => {
  return (
    <header className={s.header}>
      <Container>
        <div className={s.headerWrapper}>
          <Link className={s.headerTitle} href={'/public'}>
            Inctagram
            <span className={s.headerSmallTitle}>
              Super
              <b>Admin</b>
            </span>
          </Link>

          <div className={s.headerGroupContainer}>
            <SelectBox
              options={[
                { value: 'option1', icon: <FlagRussia />, label: 'Russia' },
                { value: 'option2', icon: <FlagEngland />, label: 'England' },
              ]}
              name={'select1'}
              type={'lang'}
              defaultValue={'option2'}
              fullWidth={false}
            />
          </div>
        </div>
      </Container>
    </header>
  )
}
