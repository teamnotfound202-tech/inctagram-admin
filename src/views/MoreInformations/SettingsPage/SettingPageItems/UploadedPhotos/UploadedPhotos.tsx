import { ISOStringFormat } from 'date-fns'
import s from './UploadedPhotos.module.scss'
import Image from 'next/image'

export type ImagePost = {
  id: number
  createdAt: ISOStringFormat
  url: string
  width: number
  height: number
  fileSize: number
}

const image: ImagePost[] = [
  {
    id: 1,
    createdAt: '2024-10-13T12:04:31.082Z' as ISOStringFormat,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/a2d04527-3438-4086-94d3-b3690ce8aac4_users/73/post/b5f987dc-f90c-4aea-bf0a-1886f676f918-images-1440x1440',
    width: 200,
    height: 300,
    fileSize: 1000
  },
  {
    id: 2,
    createdAt: '2024-10-13T12:04:31.082Z' as ISOStringFormat,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/a2d04527-3438-4086-94d3-b3690ce8aac4_users/73/post/b5f987dc-f90c-4aea-bf0a-1886f676f918-images-1440x1440',
    width: 200,
    height: 300,
    fileSize: 1000
  },
  {
    id: 3,
    createdAt: '2024-10-13T12:04:31.082Z' as ISOStringFormat,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/a2d04527-3438-4086-94d3-b3690ce8aac4_users/73/post/b5f987dc-f90c-4aea-bf0a-1886f676f918-images-1440x1440',
    width: 200,
    height: 300,
    fileSize: 1000
  },
  {
    id: 4,
    createdAt: '2024-10-13T12:04:31.082Z' as ISOStringFormat,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/a2d04527-3438-4086-94d3-b3690ce8aac4_users/73/post/b5f987dc-f90c-4aea-bf0a-1886f676f918-images-1440x1440',
    width: 200,
    height: 300,
    fileSize: 1000
  },
  {
    id: 5,
    createdAt: '2024-10-13T12:04:31.082Z' as ISOStringFormat,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/a2d04527-3438-4086-94d3-b3690ce8aac4_users/73/post/b5f987dc-f90c-4aea-bf0a-1886f676f918-images-1440x1440',
    width: 200,
    height: 300,
    fileSize: 1000
  },
  {
    id: 6,
    createdAt: '2024-10-13T12:04:31.082Z' as ISOStringFormat,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/a2d04527-3438-4086-94d3-b3690ce8aac4_users/73/post/b5f987dc-f90c-4aea-bf0a-1886f676f918-images-1440x1440',
    width: 200,
    height: 300,
    fileSize: 1000
  },
  {
    id: 7,
    createdAt: '2024-10-13T12:04:31.082Z' as ISOStringFormat,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/a2d04527-3438-4086-94d3-b3690ce8aac4_users/73/post/b5f987dc-f90c-4aea-bf0a-1886f676f918-images-1440x1440',
    width: 200,
    height: 300,
    fileSize: 1000
  },
  {
    id: 8,
    createdAt: '2024-10-13T12:04:31.082Z' as ISOStringFormat,
    url: 'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/a2d04527-3438-4086-94d3-b3690ce8aac4_users/73/post/b5f987dc-f90c-4aea-bf0a-1886f676f918-images-1440x1440',
    width: 200,
    height: 300,
    fileSize: 1000
  }
]

export const UploadedPhotos = () => {
  return (
    <div className={s.userByPhoto}>
      {image.map((image, index) =>(
        <Image key={index} src={image.url} alt="photo" width={220} height={250}/>
      ))}
    </div>
  )
}

