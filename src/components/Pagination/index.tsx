import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Link
        href={`${baseUrl}page=${currentPage - 1}`}
        className={`px-4 py-2 text-sm text-zinc-300 border border-zinc-700 rounded-lg hover:bg-zinc-800 ${
          currentPage === 1 ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        Previous
      </Link>
      
      {[...Array(totalPages)].map((_, i) => (
        <Link
          key={i + 1}
          href={`${baseUrl}page=${i + 1}`}
          className={`w-10 h-10 rounded-lg text-sm flex items-center justify-center ${
            currentPage === i + 1
              ? 'bg-[#853BFF] text-white'
              : 'text-zinc-300 border border-zinc-700 hover:bg-zinc-800'
          }`}
        >
          {i + 1}
        </Link>
      ))}
      
      <Link
        href={`${baseUrl}page=${currentPage + 1}`}
        className={`px-4 py-2 text-sm text-zinc-300 border border-zinc-700 rounded-lg hover:bg-zinc-800 ${
          currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        Next
      </Link>
    </div>
  )
}

