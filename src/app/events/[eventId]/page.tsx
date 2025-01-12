import { Suspense } from 'react'
import { Pagination } from '@/components/Pagination'
import { EventCardSkeleton } from '@/components/EventCardSkeleton'
import { PaginationSkeleton } from '@/components/PaginationSkeleton'
import { SearchForm } from '@/components/Search-form'
import { Events, EventsResponse } from '@/types/events'
import EventList from '@/components/TempComp/EventList'
import BufferSection from '@/components/Header'

async function getEvents(page: number, category: string, search: string): Promise<EventsResponse> {
  const limit = 10
  const offset = (page - 1) * limit
  const baseUrl = 'https://slight-devina-aditya-riviera25-0e83fb11.koyeb.app/v1/events/'

  let url = `${baseUrl}?offset=0&limit=1000` // Fetch all events

  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }

  const data = await response.json()

  // Client-side filtering for more accurate results
  const cleanedEvents = data.events.map((event: Events) => ({
    ...event,
    image: event.image.trim()
  }))
  
  let filteredEvents = cleanedEvents


  // Filter for premium events if category is 'premium'
  if (category === 'premium') {
    filteredEvents = filteredEvents.filter((event: Events) => event.featured === true)
  } else if (category && category !== 'all') {
    filteredEvents = filteredEvents.filter((event: Events) => event.category === category)
  }

  if (search && search.length >= 3) {
    const searchLower = search.toLowerCase()
    filteredEvents = filteredEvents.filter((event: Events) =>
      event.name.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower) ||
      event.club.toLowerCase().includes(searchLower)
    ).sort((a: Events, b: Events) => {
      const aTitle = a.name.toLowerCase().includes(searchLower)
      const bTitle = b.name.toLowerCase().includes(searchLower)
      const aDescription = a.description.toLowerCase().includes(searchLower)
      const bDescription = b.description.toLowerCase().includes(searchLower)
      const aClub = a.club.toLowerCase().includes(searchLower)
      const bClub = b.club.toLowerCase().includes(searchLower)

      if (aTitle && !bTitle) return -1
      if (!aTitle && bTitle) return 1
      if (aDescription && !bDescription) return -1
      if (!aDescription && bDescription) return 1
      if (aClub && !bClub) return -1
      if (!aClub && bClub) return 1
      return 0
    })
  }

  //  pagination
  const paginatedEvents = filteredEvents.slice(offset, offset + limit)

  return {
    events: paginatedEvents,
    total_pages: Math.ceil(filteredEvents.length / limit),
    total_events: filteredEvents.length
  }
}

const bufferProps = {
  backgroundImage: "/images/eventsHeader.png",
  title: "EVENTS",
  description: "Discover the latest events happening around you. Stay updated and never miss out!",
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const asyncSearchParams = await new Promise<{ [key: string]: string | string[] | undefined }>((resolve) => {
    setTimeout(() => resolve(searchParams), 100) 
  })

  const page = asyncSearchParams.page ? parseInt(asyncSearchParams.page as string, 10) : 1
  const category = (asyncSearchParams.category as string) || 'all'
  const search = (asyncSearchParams.search as string) || ''

  const { events, total_pages, total_events } = await getEvents(page, category, search)

  const baseUrl = `/events?${new URLSearchParams({ category, search }).toString()}&`

  return (
    <>
      <BufferSection {...bufferProps} />
      <div className="min-h-screen bg-background px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-7xl mx-auto mt-[100vh]">
          </div>

          <SearchForm defaultCategory={category} defaultSearch={search} />

          <Suspense fallback={
            <div className="space-y-8">
              {Array.from({ length: 10 }).map((_, index) => (
                <EventCardSkeleton key={index} />
              ))}
            </div>
          }>
            {events.length > 0 ? (
              <EventList events={events} />
            ) : (
              <div className="text-center py-8">
                <h2 className="text-2xl font-semibold text-primary-foreground">No events found</h2>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
              </div>
            )}
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
    </>
  )
}
