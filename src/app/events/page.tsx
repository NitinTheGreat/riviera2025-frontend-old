import { Suspense } from 'react'
import { EventCard } from '@/components/EventCard'
import { Pagination } from '@/components/Pagination'
import { EventCardSkeleton } from '@/components/EventCardSkeleton'
import { PaginationSkeleton } from '@/components/PaginationSkeleton'
import { SearchForm } from '@/components/Search-form'
import { Events, EventsResponse } from '@/types/events'

async function getEvents(page: number, category: string, search: string): Promise<EventsResponse> {
  const limit = 10
  const offset = (page - 1) * limit
  const baseUrl = 'https://riviera.vit.ac.in/api/v1/events/'

  let url = `${baseUrl}?offset=0&limit=1000` // Fetch all events

  if (category && category !== 'all') {
    url += `&category=${category}`
  }

  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }

  const data = await response.json()

  // Client-side filtering for more accurate results
  let filteredEvents = data.events
  if (search && search.length >= 3) {
    const searchLower = search.toLowerCase()
    filteredEvents = data.events.filter((event: Events) =>
      event.name.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower)
    ).sort((a: Events, b: Events) => {
      const aTitle = a.name.toLowerCase().includes(searchLower)
      const bTitle = b.name.toLowerCase().includes(searchLower)
      if (aTitle && !bTitle) return -1
      if (!aTitle && bTitle) return 1
      return 0
    })
  }

  // Apply pagination to filtered results
  const paginatedEvents = filteredEvents.slice(offset, offset + limit)

  return {
    events: paginatedEvents,
    total_pages: Math.ceil(filteredEvents.length / limit),
    total_events: filteredEvents.length
  }
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const asyncSearchParams = await new Promise<{ [key: string]: string | string[] | undefined }>((resolve) => {
    setTimeout(() => resolve(searchParams), 100) 
  })  // getting error if not making async therefore had to make async

  const page = asyncSearchParams.page ? parseInt(asyncSearchParams.page as string, 10) : 1
  const category = (asyncSearchParams.category as string) || 'all'
  const search = (asyncSearchParams.search as string) || ''

  const { events, total_pages, total_events } = await getEvents(page, category, search)

  const baseUrl = `/events?${new URLSearchParams({ category, search }).toString()}&`


  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-center text-primary mb-12 font-editorial">
          EVENTS
        </h1>

        <SearchForm defaultCategory={category} defaultSearch={search} />

        <Suspense fallback={
          <div className="space-y-8">
            {Array.from({ length: 10 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        }>
          <div className="space-y-8">
            {events.map((event, index) => (
              <EventCard key={event.pid} event={event} index={index} />
            ))}
          </div>
        </Suspense>

        <Suspense fallback={<PaginationSkeleton />}>
          <Pagination
            currentPage={page}
            totalPages={total_pages}
            totalEvents={total_events}
            baseUrl={baseUrl}
          />
        </Suspense>
      </div>
    </div>
  )
}
