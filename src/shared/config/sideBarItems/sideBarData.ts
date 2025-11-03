import { Path } from '../routes/routes'

export type Text = 'Users list' | 'Statistics' | 'Payments list' | 'Posts list'

export type SideBarData = {
  key: string
  text: Text
  link: string
  isDisabled: boolean
}

export const sideBarData: SideBarData[] = [
  {
    key: 'Users list',
    text: 'Users list',
    link: Path.UsersList,
    isDisabled: false,
  },
  {
    key: 'Statistics',
    text: 'Statistics',
    link: Path.Statistics,
    isDisabled: false,
  },
  {
    key: 'Payments list',
    text: 'Payments list',
    link: Path.PaymentsList,
    isDisabled: false,
  },
  {
    key: 'Posts list',
    text: 'Posts list',
    link: Path.PostsList,
    isDisabled: false,
  },
]
