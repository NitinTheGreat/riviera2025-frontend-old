'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalEvents: number
  baseUrl: string
}

export function Pagination({ currentPage, totalPages, totalEvents, baseUrl }: PaginationProps) {
  const [visiblePages, setVisiblePages] = useState<(number | string)[]>([])
  const router = useRouter()

  useEffect(() => {
    const calculateVisiblePages = () => {
      const maxVisible = 6
      const pages: (number | string)[] = []

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        let start = Math.max(1, currentPage - 2)
        const end = Math.min(start + maxVisible - 1, totalPages)

        if (end - start < maxVisible - 1) {
          start = Math.max(1, end - maxVisible + 1)
        }

        if (start > 1) {
          pages.push(1)
          if (start > 2) pages.push('...')
        }

        for (let i = start; i <= end; i++) {
          pages.push(i)
        }

        if (end < totalPages) {
          if (end < totalPages - 1) pages.push('...')
          pages.push(totalPages)
        }
      }

      setVisiblePages(pages)
    }

    calculateVisiblePages()
  }, [currentPage, totalPages])

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
     router.push(`${baseUrl}page=${page}#container`, { scroll: false });
    }
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 mt-8">
      <div className="text-zinc-400 text-sm text-center">
        Showing {Math.min((currentPage - 1) * 10 + 1, totalEvents)} - {Math.min(currentPage * 10, totalEvents)} of {totalEvents} events
      </div>
      <div className="flex flex-wrap items-center justify-between sm:flex-nowrap sm:gap-4 w-full ">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          className={`order-1 mb-6 lg:mb-0 sm:order-none px-8 py-2 border border-zinc-700   transition-colors hover:bg-zinc-800 flex items-center gap-2 ${
            currentPage === 1 ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">Previous</span>
        </button>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-2 order-3 sm:order-none w-full sm:w-auto sm:mx-auto"
          initial={false}
        >
          {visiblePages.map((page, i) => (
            page === '...' ? (
              <span
                key={`ellipsis-${i}`}
                className="w-8 h-8 sm:w-10 sm:h-10  text-sm flex items-center justify-center text-zinc-400"
              >
                ...
              </span>
            ) : (
              <motion.div
                key={page}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => handlePageChange(page as number)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 border-zinc-400 text-sm flex items-center justify-center transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-zinc-700 hover:bg-zinc-800'
                  }`}
                >
                  {page}
                </button>
              </motion.div>
            )
          ))}
        </motion.div>

        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          className={`order-2 mb-6 lg:mb-0 sm:order-none px-8 py-2 border border-zinc-700  transition-colors hover:bg-zinc-800 flex items-center gap-2 ${
            currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

