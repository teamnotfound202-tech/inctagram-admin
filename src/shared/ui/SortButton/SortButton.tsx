'use client'
import { useState } from 'react'
import ArrowSortUp from './icons/ArrowSortUp.svg'
import ArrowSortDown from './icons/ArrowSortDown.svg'
import ArrowUpDown from './icons/ArrowUpDown.svg'
import s from './SortButton.module.scss'

type DirectionType = 'asc' | 'desc'|''
export const changeDirection = (direction: DirectionType):DirectionType => {
  let value:DirectionType = ''
  switch (direction) {
    case 'asc':
      value = 'desc'
      break
    case 'desc':
      value = ''
      break
    case '':
      value = 'asc'
      break
    default:
      value = ''
  }
  return value
}

export const SortButton = () => {
  const [direction, setDirection] = useState<DirectionType>('')

  const handleClick = ()=>{
    const nextDirection:DirectionType = changeDirection(direction)
    setDirection(nextDirection)
  }
  return (
    <button onClick={handleClick} className={s.button}>
      {direction === '' &&<ArrowUpDown />}
      {direction === 'asc' && <ArrowSortUp/>}
      {direction === 'desc' && <ArrowSortDown/>}
    </button>
  )
}

