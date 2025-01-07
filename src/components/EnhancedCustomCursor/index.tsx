'use client'

import React from 'react'
import { useOptimizedCursor } from '../../../hooks/useCursor'

const EnhancedCustomCursor: React.FC = () => {
  const { cursorRef, isPointer, isClicked } = useOptimizedCursor()

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-50 transition-transform duration-75 ease-out
                  ${isPointer ? 'cursor-pointer' : ''}
                  ${isClicked ? 'cursor-clicked' : ''}`}
      style={{
        width: '28px',
        height: '28px',
        marginLeft: '-14px',
        marginTop: '-14px',
      }}
    >
      <img 
        src="/images/customCursor.svg" 
        alt="Custom Cursor" 
        className="w-full h-full transition-transform duration-150 ease-out"
        style={{
          transform: `scale(${isClicked ? 0.9 : isPointer ? 1.1 : 1})`,
        }}
      />
    </div>
  )
}

export default EnhancedCustomCursor

