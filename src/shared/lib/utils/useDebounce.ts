import { useEffect, useState } from 'react'

export const useDebounce = (value: string,delay:number)=>{
  const [debounced, setDebounced] = useState('')
  useEffect(() => {
    const timeoutId = setTimeout(()=>{
      setDebounced(value)
    }, delay)
    return () => {
      clearTimeout(timeoutId)
    }
  },[value,delay])
  return debounced
}