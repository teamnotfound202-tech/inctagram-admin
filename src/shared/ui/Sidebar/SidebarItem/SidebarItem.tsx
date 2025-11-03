'use client'

import type { Text } from '@/shared/config'
import { DynamicIcon } from './DinamicIcon/DinamicIcon'
import s from './SidebarItem.module.scss'
import Link from 'next/link'
import clx from 'classnames'
import { usePathname } from 'next/navigation'

type Props = {
  link: string
  text: Text
  isDisabled: boolean
  isVisible?: boolean
  spanText: string
}
export const SidebarItem = ({
  link,
  text,
  isDisabled,
  isVisible,
  spanText,
}: Props) => {
  const pathname = usePathname()
  const baseClasses = clx(s.sidebarItemLink, {
    [s.unvisible]: isVisible,
  })

  return (
    <li
      className={clx(s.sidebarItem, {
        [s.disabled]: isDisabled,
        [s.active]: link === pathname
      })}
    >
        <Link href={link} className={baseClasses}>
            <DynamicIcon text={text} />
            <span className={s.sidebarItemtext}>{spanText}</span>
        </Link>
    </li>
  )
}
