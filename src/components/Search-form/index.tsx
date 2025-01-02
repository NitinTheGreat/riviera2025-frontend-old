

'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import debounce from 'lodash/debounce'

interface SearchFormProps {
  defaultCategory: string
  defaultSearch: string
}

export function SearchForm({ defaultCategory, defaultSearch }: SearchFormProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set(name, value)
    if (name === 'search' || name === 'category') {
      params.set('page', '1') // Reset to first page on new search/filter
    }
    return params.toString()
  }, [searchParams])

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      router.push(pathname + '?' + createQueryString('search', term))
    }, 300),
    [createQueryString, pathname, router]
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    if (term.length >= 3 || term.length === 0) {
      debouncedSearch(term)
    }
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(pathname + '?' + createQueryString('category', e.target.value))
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
      <select
        defaultValue={defaultCategory}
        onChange={handleCategoryChange}
        className="w-full md:w-[200px] bg-zinc-900 border border-zinc-700 text-zinc-100 rounded-lg px-3 py-2"
      >
        <option value="all">All Events</option>
        <option value="technical">Technical</option>
        <option value="non-technical">Non Technical</option>
      </select>
      
      <div className="relative">
        <input
          type="text"
          defaultValue={defaultSearch}
          onChange={handleSearch}
          placeholder="Search Event"
          className="w-full md:w-[300px] bg-zinc-900 border border-zinc-700 text-zinc-100 rounded-lg px-3 py-2 pl-10"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#853BFF] h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  )
}

