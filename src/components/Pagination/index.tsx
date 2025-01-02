'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = []
    const maxVisible = 6

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      for (let i = 1; i <= maxVisible; i++) {
        pages.push(i)
      }
      if (currentPage > maxVisible) {
        pages.push('...')
        pages.push(totalPages)
      } else {
        pages.push('...')
      }
    }

    return pages
  }

  return (
    <div className="flex items-center justify-between gap-4 mt-8">
      <Link
        href={`${baseUrl}page=${Math.max(1, currentPage - 1)}`}
        className={`px-6 py-2 border border-zinc-700 rounded-lg transition-colors hover:bg-zinc-800 flex items-center gap-2 ${
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
        Previous
      </Link>
      
      <motion.div 
        className="flex gap-2"
        initial={false}
      >
        {renderPageNumbers().map((page, i) => (
          page === '...' ? (
            <span
              key={`ellipsis-${i}`}
              className="w-10 h-10 rounded-lg text-sm flex items-center justify-center text-zinc-400"
            >
              ...
            </span>
          ) : (
            <motion.div
              key={page}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={`${baseUrl}page=${page}`}
                className={`w-10 h-10 rounded-lg text-sm flex items-center justify-center transition-colors ${
                  currentPage === page
                    ? 'bg-[#853BFF] text-white'
                    : 'border border-zinc-700 hover:bg-zinc-800'
                }`}
              >
                {page}
              </Link>
            </motion.div>
          )
        ))}
      </motion.div>

      <Link
        href={`${baseUrl}page=${Math.min(totalPages, currentPage + 1)}`}
        className={`px-6 py-2 border border-zinc-700 rounded-lg transition-colors hover:bg-zinc-800 flex items-center gap-2 ${
          currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        Next
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
      </Link>
    </div>
  )
}

