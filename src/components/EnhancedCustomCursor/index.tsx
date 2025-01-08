'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const EnhancedCustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const hasMouse = window.matchMedia('(pointer:fine)').matches

    if (hasMouse) {
      const updatePosition = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY })
      }

      const checkIfPointer = (e: MouseEvent) => {
        setIsPointer((e.target as Element).classList.contains('pointer-cursor-element'))
        setIsHidden((e.target as Element).classList.contains('cursor-none'))
      }

      const handleClick = () => {
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 200)
      }

      document.addEventListener('mousemove', updatePosition)
      document.addEventListener('mouseover', checkIfPointer)
      document.addEventListener('mouseout', checkIfPointer)
      document.addEventListener('click', handleClick)

      return () => {
        document.removeEventListener('mousemove', updatePosition)
        document.removeEventListener('mouseover', checkIfPointer)
        document.removeEventListener('mouseout', checkIfPointer)
        document.removeEventListener('click', handleClick)
      }
    }
  }, [])

  // Don't render the custom cursor on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer:fine)').matches) {
    return null
  }

  return (
    <div
      className={`fixed pointer-events-none z-[999] transition-opacity duration-300 ${
        isHidden ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div
        className={`w-8 h-8 transition-transform duration-150 ${
          isPointer ? 'scale-150' : 'scale-100'
        } ${isClicked ? 'scale-75' : ''}`}
      >
        <Image
          src="/images/customCursor.svg"
          alt="Custom Cursor"
          width={32}
          height={32}
          className="w-full h-full"
        />
      </div>
    </div>
  )

}

export default EnhancedCustomCursor

