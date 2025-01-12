import { Suspense } from 'react'
import { Pagination } from '@/components/Pagination'
import { EventCardSkeleton } from '@/components/EventCardSkeleton'
import { PaginationSkeleton } from '@/components/PaginationSkeleton'
import { SearchForm } from '@/components/Search-form'
import { Events, EventsResponse } from '@/types/events'
import EventList from '@/components/TempComp/EventList'
import BufferSection from '@/components/Header'
import axios from 'axios'

async function getEvents(page: number, category: string, search: string): Promise<EventsResponse> {
  const limit = 10
  const offset = (page - 1) * limit
  const baseUrl = process.env.Base_URL

  try {
    const response = await axios.get(`${baseUrl}`, {
      params: {
        event_type: 'external',
        event: search,
        limit: 1000, // Fetch all events
        ...(category && category !== 'all' ? { category: category } : {}),
        offset: 0,
      },
    })

    const data = response.data

    // Check if events array is empty or undefined
    if (!data.events || data.events.length === 0) {
      return {
        events: [],
        total_pages: 0,
        total_events: 0
      }
    }

    // Clean the events data
    const cleanedEvents = data.events.map((event: Events) => ({
      ...event,
      image: event.image.trim()
    }))

    // Filter for premium events if category is 'premium'
    let filteredEvents = cleanedEvents
    if (category === 'premium') {
      filteredEvents = filteredEvents.filter((event: Events) => event.featured === true)
    }

    // Paginate the events
    const paginatedEvents = filteredEvents.slice(offset, offset + limit)

    return {
      events: paginatedEvents,
      total_pages: Math.ceil(filteredEvents.length / limit),
      total_events: filteredEvents.length
    }
  } catch (error) {
    console.error('Failed to fetch events:', error)
    throw new Error('Failed to fetch events')
  }
}

const bufferProps = {
  backgroundImage: "/images/eventsHeader.png",
  title: "EXTERNAL EVENTS",
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

  const baseUrl = `/externalEvents?${new URLSearchParams({ category, search }).toString()}&`

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

          {total_pages > 0 && (
            <Suspense fallback={<PaginationSkeleton />}>
              <Pagination
                currentPage={page}
                totalPages={total_pages}
                totalEvents={total_events}
                baseUrl={baseUrl}
              />
            </Suspense>
          )}
        </div>
      </div>
    </>
  )
}

