import { Suspense } from 'react'
import axios from 'axios'
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
  const baseUrl = process.env.Base_URL

  try {
    const response = await axios.get(`${baseUrl}`, {
      params: {
        event_type: 'external',
        event: search,
        limit: limit,
        ...(category && category !== 'all' ? { category: category } : {}),
        offset: offset,
      },
    })

    const data = response.data
    console.log(data)

    return {
      events: data.events.map((event: Events) => ({
        ...event,
        image: event.image.trim()
      })),
      total_pages: data.total_pages,
      total_events: data.events.length
    }
  } catch (error) {
    console.error('Failed to fetch events:', error)
    throw new Error('Failed to fetch events')
  }
}

const bufferProps = {
  backgroundImage: "/images/eventsHeader.png",
  title: "EVENTS",
  description: "Discover the latest events happening around you. Stay updated and never miss out!",
}

export const revalidate = 90 // Revalidate every 90 seconds

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = searchParams.page ? parseInt(searchParams.page as string, 10) : 1
  const category = (searchParams.category as string) || 'all'
  const search = (searchParams.search as string) || ''

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

