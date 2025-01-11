'use client'

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isPointer, setIsPointer] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVideo, setIsVideo] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const hasMouse = window.matchMedia("(pointer:fine)").matches

    if (hasMouse) {
      let rafId: number | null = null

      const updatePosition = (e: MouseEvent) => {
        if (cursorRef.current) {
          rafId = requestAnimationFrame(() => {
            cursorRef.current!.style.transform = `translate(${e.clientX}px, ${e.clientY}px) ${
              isPointer ? "rotate(30deg) translateY(-5px)" : ""
            }`
          })
        }
      }

      const checkIfPointer = (e: MouseEvent) => {
        const target = e.target as Element
        setIsPointer(
          target.classList.contains("pointer-cursor-element") ||
          target.tagName.toLowerCase() === 'a' ||
          target.tagName.toLowerCase() === 'button'
        )
        setIsVideo(target.classList.contains("video-cursor-element"))
        setIsHidden(target.classList.contains("cursor-none"))
      }

      const handleClick = () => {
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 200)
      }

      document.addEventListener("mousemove", updatePosition)
      document.addEventListener("mouseover", checkIfPointer)
      document.addEventListener("mouseout", checkIfPointer)
      document.addEventListener("click", handleClick)

      return () => {
        document.removeEventListener("mousemove", updatePosition)
        document.removeEventListener("mouseover", checkIfPointer)
        document.removeEventListener("mouseout", checkIfPointer)
        document.removeEventListener("click", handleClick)
        if (rafId) cancelAnimationFrame(rafId)
      }
    }
  }, [isPointer])

  if (typeof window === "undefined" || !window.matchMedia("(pointer:fine)").matches) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[999]">
      <div
        ref={cursorRef}
        className={`fixed transition-transform duration-100 ease-out ${
          isClicked ? "scale-90" : ""
        } ${isVideo || isHidden ? "hidden" : ""}`}
        style={{
          left: '0',
          top: '0',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      >
        <Image
          src="/images/customCursor.svg"
          width={32}
          height={32}
          alt="cursor"
          className="w-full h-full"
        />
      </div>
      <div
        className={`fixed ${isHidden ? "hidden" : ""} ${isVideo ? "video" : "hidden"} ${
          isClicked ? "scale-90" : ""
        }`}
        style={{ 
          left: '0',
          top: '0',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      >
        <Image
          src="/videoCursorLayer1.svg"
          width={48}
          height={48}
          alt="video cursor layer 1"
          className="absolute videoCursor1 w-full h-full"
        />
        <Image
          src="/videoCursorLayer2.svg"
          width={48}
          height={48}
          alt="video cursor layer 2"
          className="absolute videoCursor2 w-full h-full"
        />
        <Image
          src="/videoCursorLayer3.svg"
          width={48}
          height={48}
          alt="video cursor layer 3"
          className="absolute videoCursor3 w-full h-full"
        />
      </div>
    </div>
  )
}

export default CustomCursor

