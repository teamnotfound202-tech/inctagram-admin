import { useState } from 'react'
import { DirectionType, SortBy } from '@/shared/ui/SortButton/SortButton'

export const UseSort = () => {

  const [sortBy, setSortBy] = useState<SortBy>('created_at')
  const [sortDirection, setSortDirection] = useState('asc')


  const sortDirectionHandler = (direction: DirectionType,type:SortBy) => {
    if (direction === '' ){
      setSortDirection('asc')
    }
    if (direction === 'asc' ){
      setSortDirection('desc')
    }
    setSortBy(type)
  }

  return {sortBy, sortDirection, sortDirectionHandler}
}