import { useState, useEffect, useRef } from 'react'

export const useOptimizedCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isPointer, setIsPointer] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const updateCursor = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    const updateCursorState = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.getAttribute('role') === 'button'
      )
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    document.addEventListener('mousemove', updateCursor)
    document.addEventListener('mouseover', updateCursorState)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseover', updateCursorState)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return { cursorRef, isPointer, isClicked }
}
