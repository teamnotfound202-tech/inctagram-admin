import { ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: ReactNode
};

export const Portal = ({ children }: Props) => {
  const [mounted, ] = useState(false)
  const [container, ] = useState<HTMLElement | null>(null)

  // useEffect(() => {
  //   const el = document.getElementById('modal-root')
  //   setContainer(el)
  //   setMounted(true)
  // }, [])

  if (!mounted || !container) return null
  return createPortal(children, container)
}