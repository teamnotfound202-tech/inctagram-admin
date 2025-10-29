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
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkJigufyq00dk5hZq_acK0ix6Gq5LMj59Kg&s',
    width: 200,
    height: 300,
    fileSize: 1000
  },
  {
    id: 2,
    createdAt: '2024-10-13T12:04:31.082Z' as ISOStringFormat,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkJigufyq00dk5hZq_acK0ix6Gq5LMj59Kg&s',
    width: 200,
    height: 300,
    fileSize: 1000
  },
  {
    id: 3,
    createdAt: '2024-10-13T12:04:31.082Z' as ISOStringFormat,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkJigufyq00dk5hZq_acK0ix6Gq5LMj59Kg&s',
    width: 200,
    height: 300,
    fileSize: 1000
  },
  {
    id: 4,
    createdAt: '2024-10-13T12:04:31.082Z' as ISOStringFormat,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkJigufyq00dk5hZq_acK0ix6Gq5LMj59Kg&s',
    width: 200,
    height: 300,
    fileSize: 1000
  },
  {
    id: 5,
    createdAt: '2024-10-13T12:04:31.082Z' as ISOStringFormat,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkJigufyq00dk5hZq_acK0ix6Gq5LMj59Kg&s',
    width: 200,
    height: 300,
    fileSize: 1000
  },
  {
    id: 6,
    createdAt: '2024-10-13T12:04:31.082Z' as ISOStringFormat,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkJigufyq00dk5hZq_acK0ix6Gq5LMj59Kg&s',
    width: 200,
    height: 300,
    fileSize: 1000
  },
  {
    id: 7,
    createdAt: '2024-10-13T12:04:31.082Z' as ISOStringFormat,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkJigufyq00dk5hZq_acK0ix6Gq5LMj59Kg&s',
    width: 200,
    height: 300,
    fileSize: 1000
  },
  {
    id: 8,
    createdAt: '2024-10-13T12:04:31.082Z' as ISOStringFormat,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkJigufyq00dk5hZq_acK0ix6Gq5LMj59Kg&s',
    width: 200,
    height: 300,
    fileSize: 1000
  }
]

export const UploadedPhotos = () => {
  return (
    <div className={s.userByPhoto}>
      {image.map((image, index) =>(
        <Image key={index} src={image.url} alt="photo"/>
      ))}
    </div>
  )
}

