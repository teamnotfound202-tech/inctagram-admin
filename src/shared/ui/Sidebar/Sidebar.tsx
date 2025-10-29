'use client'
import { SidebarItem } from './SidebarItem/SidebarItem'
import s from './Sidebar.module.scss'
import { sideBarData } from '@/shared/config/sideBarItems/sideBarData'
// import { usePathname, useRouter } from 'next/navigation'
import { Path } from '@/shared/config'
import type { Text } from '@/shared/config'

export const Sidebar = () => {
  // const router = useRouter()
  // const pathname = usePathname()

  const linkCreator = (text: Text) => {
    let link = ''
    switch (text) {
      case 'Users list':
        link = Path.UsersList
        break
      case 'Statistics':
        link = Path.Statistics
        break
      case 'Payments list':
        link = Path.PaymentsList
        break
      case 'Posts list':
        link = Path.PostsList
        break
      default:
        link = ''
    }
    return link
  }

  return (
    <ul className={s.sidebar}>
      {sideBarData?.map((item) => {
        const link = linkCreator(item.text)

        return (
          <SidebarItem
            key={item.key}
            text={item.text}
            link={link}
            spanText={item.text}
            isDisabled={item.isDisabled}
            {...(item.onclick && { onClickAction: () => {} })}
          />
        )
      })}
    </ul>
  )
}
