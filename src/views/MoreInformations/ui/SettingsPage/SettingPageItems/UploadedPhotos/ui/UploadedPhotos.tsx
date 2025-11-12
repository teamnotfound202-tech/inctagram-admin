import s from './UploadedPhotos.module.scss'
import Image from 'next/image'
import {
  useGetUploadPhotosByUserQuery
} from '@/views/MoreInformations/ui/SettingsPage/SettingPageItems/UploadedPhotos/api/uploadedPhotos.generated'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll'
import { useState } from 'react'

type Props = {
  userId: number
}
export const UploadedPhotos = ({userId}: Props) => {
  const {data, fetchMore}=useGetUploadPhotosByUserQuery({variables:{ userId:userId, endCursorId: 0 }})

  const [currentPage, setCurrentPage] = useState(1)

  const hasNextPage = data && currentPage < data.getPostsByUser.pagesCount

  const getNextImagesByUser = () =>{
    const cursorId = data?.getPostsByUser.items?.[data.getPostsByUser.items.length - 1].id
    if(hasNextPage && cursorId){
      fetchMore({variables:{userId:userId, endCursorId:cursorId}})
      setCurrentPage(prevState => prevState + 1)
    }
  }
  const listsRef = useInfiniteScroll({ func: getNextImagesByUser })

  return (
    <div className={s.userByPhoto}>
      {data &&
        data.getPostsByUser?.items?.map((image, index) => (
          <Image key={index} src={image.url ?? ''} alt="photo" width={220} height={250} />
        ))}
      {hasNextPage && <div ref={listsRef} style={{height:"1px"}}/>}
    </div>
  )
}

