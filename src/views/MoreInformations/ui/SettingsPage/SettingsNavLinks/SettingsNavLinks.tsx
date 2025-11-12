import s from './SettingsNavLinks.module.scss'
import {
  SettingNavLinkItem
} from '@/views/MoreInformations/ui/SettingsPage/SettingsNavLinks/SettingNavLinkItem/SettingNavLinkItem'

export const SettingsNavLinks = () => {
  return (
    <nav className={s.settingsNavLinks}>
      <SettingNavLinkItem href={'uploaded-photos'} text={'Uploaded Photos'} />
      <SettingNavLinkItem href={'payments'} text={'Payments'} />
      <SettingNavLinkItem href={'followers'} text={'Followers'} />
      <SettingNavLinkItem href={'following'} text={'Following'}
      />
    </nav>
  )
}