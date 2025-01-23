'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useState, useEffect } from 'react'
import debounce from 'lodash/debounce'
import { ChevronDown } from 'lucide-react'
interface SearchFormProps {
  defaultCategory: string
  defaultSearch: string
}

export function SearchForm({ defaultCategory, defaultSearch }: SearchFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [search, setSearch] = useState(defaultSearch)
  const [category, setCategory] = useState(defaultCategory)

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set(name, value)
   
    return params.toString()
  }, [searchParams])

  const createQueryStringCat = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set(name, value)
    params.set('page','1')
    return params.toString()
  }, [searchParams])

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (term.length >= 3 || term.length === 0) {
        router.push(`${pathname}?${createQueryString('search', term)}`, { scroll: false })
      }
    }, 300),
    [createQueryString, router, pathname]
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
    router.push(`${pathname}?${createQueryStringCat('category', newCategory)}`, { scroll: false })
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
      {/* <select
        value={category}
        onChange={handleCategoryChange}
        className="w-full md:w-[200px] bg-zinc-900 border border-zinc-400 text-primary-foreground  px-6 py-2"
      >
        <option value="all">All Events</option>
        {/* <option value="premium">Premium</option> */}
        {/* <option value="art_drama">Art Drama</option>
        <option value="adventure_sports">Adventure Sports</option>
        <option value="Music">Music</option>
        <option value="quiz_words_worth">Quiz</option>
      </select>  */}
      <div className="relative w-full md:w-[200px]">
      <select
        value={category}
        onChange={handleCategoryChange}
        className="w-full md:w-[200px] bg-zinc-900 border border-zinc-400 text-primary-foreground px-6 py-2 appearance-none pr-10"
      >
        <option value="all">All Events</option>
        {/* <option value="premium">Premium</option> */}
        <option value="art_drama">Art Drama</option>
        <option value="adventure_sports">Adventure Sports</option>
        <option value="Music">Music</option>
        <option value="quiz_words_worth">Quiz</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
        <ChevronDown className="h-5 w-5 text-zinc-400" />
      </div>
    </div>
      
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search Event"
          className="w-full md:w-[300px] bg-zinc-900 border border-zinc-400 text-primary-foreground px-3 py-2 pl-10"
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

