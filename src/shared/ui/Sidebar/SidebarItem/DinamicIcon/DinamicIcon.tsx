import s from '../SidebarItem.module.scss'
import type { SVGProps } from 'react'
import UsersIcon from '../icons/users.svg'
import StatisticsIcon from '../icons/statistics.svg'
import PaymentsIcon from '../icons/payments.svg'
import PostsIcon from '../icons/posts.svg'

const iconMap = {
  'Users list': UsersIcon,
  Statistics: StatisticsIcon,
  'Payments list': PaymentsIcon,
  'Posts list': PostsIcon,
}

type IconProp = {
  text: keyof typeof iconMap
} & SVGProps<SVGSVGElement>

export const DynamicIcon = ({ text, ...props }: IconProp) => {
  const IconComponent = iconMap[text]

  if (!IconComponent) {
    return <div>Иконка не найдена</div>
  }

  return <IconComponent className={s.icon} {...props} />
}
