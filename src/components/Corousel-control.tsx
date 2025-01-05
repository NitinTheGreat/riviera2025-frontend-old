'use client'

import { cn } from "@/lib/utils"
import { Shuffle } from 'lucide-react'

interface CarouselControlsProps {
  onPrevious: () => void
  onNext: () => void
  onPlayPause: () => void
  onShuffle?: () => void
  isPlaying: boolean
  className?: string
}

export function CarouselControls({
  onPrevious,
  onNext,
  onPlayPause,
  onShuffle,
  isPlaying,
  className
}: CarouselControlsProps) {
  return (
    <div className={cn("flex items-center justify-center gap-6", className)}>
      {onShuffle && (
        <button
          onClick={onShuffle}
          className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Shuffle"
        >
          <Shuffle className="w-5 h-5" />
        </button>
      )}
      <button
        onClick={onPrevious}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-[#853BFF] hover:bg-gray-900 transition-colors"
        aria-label="Previous"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6l-7 6 7 6V6zm-7 6V6H6v12h6v-6z" />
        </svg>
      </button>
      <button
        onClick={onPlayPause}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-black hover:bg-gray-100 transition-colors"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <button
        onClick={onNext}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-black hover:bg-gray-100 transition-colors"
        aria-label="Next"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 18l7-6-7-6v12zm7-6v6h6V6h-6v6z" />
        </svg>
      </button>
    </div>
  )
}

