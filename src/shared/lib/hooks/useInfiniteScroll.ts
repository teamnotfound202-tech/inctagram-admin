import { useEffect, useRef } from 'react'

export const useInfiniteScroll = ({func}: {func: () => void}) => {
  const listsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((arrElements) => {
        if(arrElements[0] && arrElements[0].isIntersecting) {
          func()
        }
      },
      {
        root: null, // Отслеживание относительно окна браузера (viewport). null = весь экран
        rootMargin: '100px', // Начинать загрузку до появления элемента
        threshold: 0.1
      })

    const currentObserverRef = listsRef.current
    if (currentObserverRef) {
      observer.observe(currentObserverRef)
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef)
      }
    }
  }, [func])

  return listsRef
}