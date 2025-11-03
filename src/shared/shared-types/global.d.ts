import { ISOStringFormat } from 'date-fns'
export type AgreementsType = 'ban' | 'delete' | 'unban'

export type BanUserType = {
  reason: string
  createdAt: ISOStringFormat
}
export type UserType = {
  id: number
  profile: string
  email: string
  userName: string
  createdAt: ISOStringFormat
  userBan: BanUserType | null
}

export type ImagePostType = {
  id: number
  createdAt: ISOStringFormat
  url: string
}

export type AvatarType = {
  url: string
}

export type PostOwnerType = {
  userName: string
  avatars: AvatarType[]
}



export type PostType = {
  images: ImagePostType[]
  id: number
  ownerId: number
  description: string
  createdAt: ISOStringFormat
  updatedAt: ISOStringFormat
  postOwner: PostOwnerType
  userBan: BanUserType | null
}


export type PostsType = {
  items: PostType[]
  pageSize: number
  totalCount: number
  pagesCount: number
}