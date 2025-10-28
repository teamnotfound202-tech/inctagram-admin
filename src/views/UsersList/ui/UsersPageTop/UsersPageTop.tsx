import s from './UsersPageTop.module.scss'
import { Input } from '@/shared/ui'
import { SelectBox } from '@/shared/ui'

export const UsersPageTop = () => {
  return (
    <div className={s.usersListPageTop}>
      <Input
        id={'inputSearch'}
        className={s.usersListSearchInput}
        type="search"
        placeholder={'Search'}
        onChange={() => {}}
        value={''}
      />
      <SelectBox
        options={[
          { value: 'option1', label: 'Blocked' },
          { value: 'option2', label: 'Not Blocked' },
        ]}
        name={'select1'}
        type={'lang'}
        defaultValue={''}
        fullWidth={false}
        placeholder={'Not selected'}
      />
    </div>
  )
}
