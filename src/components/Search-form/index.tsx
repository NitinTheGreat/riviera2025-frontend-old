'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState, useEffect } from 'react'
import debounce from 'lodash/debounce'

interface SearchFormProps {
  defaultCategory: string
  defaultSearch: string
}

export function SearchForm({ defaultCategory, defaultSearch }: SearchFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(defaultSearch)
  const [category, setCategory] = useState(defaultCategory)

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set(name, value)
    params.set('page', '1') // Reset to first page on new search/filter
    return params.toString()
  }, [searchParams])

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (term.length >= 3 || term.length === 0) {
        router.push(`/events?${createQueryString('search', term)}`, { scroll: false })
      }
    }, 300),
    [createQueryString, router]
  )

  useEffect(() => {
    debouncedSearch(search)
  }, [search, debouncedSearch])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value
    setCategory(newCategory)
    router.push(`/events?${createQueryString('category', newCategory)}`, { scroll: false })
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
      <select
        value={category}
        onChange={handleCategoryChange}
        className="w-full md:w-[200px] bg-zinc-900 border border-zinc-700 text-primary-foreground rounded-lg px-3 py-2"
      >
        <option value="all">All Events</option>
        <option value="premium">Premium</option>
        <option value="art_drama">Art Drama</option>
        <option value="adventure_sports">Adventure Sports</option>
        <option value="Music">Music</option>
        <option value="quiz_words_worth">Quiz</option>
      </select>
      
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search Event"
          className="w-full md:w-[300px] bg-zinc-900 border border-zinc-700 text-primary-foreground rounded-lg px-3 py-2 pl-10"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-primary h-4 w-4"
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
