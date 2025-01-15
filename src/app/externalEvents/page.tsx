import { Suspense } from 'react'
import { Pagination } from '@/components/Pagination'
import { EventCardSkeleton } from '@/components/EventCardSkeleton'
import { PaginationSkeleton } from '@/components/PaginationSkeleton'
import { SearchForm } from '@/components/Search-form'
import { Events, EventsResponse } from '@/types/events'
import EventList from '@/components/TempComp/EventList'
import BufferSection from '@/components/Header'
import axios from 'axios'
import { EventTabs } from './EventTabs'
import {Metadata} from 'next'
async function getEvents(page: number, category: string, event_type: string): Promise<EventsResponse> {
  const limit = 10
  const offset = (page - 1) * limit
  const baseUrl = process.env.Base_URL + 'events/'

  try {
    const response = await axios.get(`${baseUrl}`, {
      params: {
        event_type: event_type,
        limit: 1000,
        ...(category && category !== 'all' ? { category: category } : {}),
        offset: 0,
      },
    })

    const data = response.data

    if (!data.events || data.events.length === 0) {
      return {
        events: [],
        total_pages: 0,
        total_events: 0
      }
    }

    const cleanedEvents: Events[] = data.events.map((event: Events) => ({
      ...event,
      category: event.category || 'Uncategorized',
      club: event.club || 'TBA',
      description: event.description || '',
      end_date: event.end_date || 'TBA',
      featured: event.featured || false,
      image: event.image ? event.image.trim() : '/placeholder-event-image.jpg',
      name: event.name || 'Untitled Event',
      on_hold: event.on_hold || false,
      pid: event.pid || '',
      price_per_ticket: event.price_per_ticket || 0,
      start_date: event.start_date || 'TBA',
      team_size: event.team_size || 'N/A',
      total_prize: event.total_prize ,
      venues: event.venues || ['TBA'],
      event_type: event_type,
      searchTerm: ''
    }))

    let filteredEvents = cleanedEvents

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


async function searchEvents(search: string): Promise<EventsResponse> {
  const baseUrl = process.env.Base_URL

  try {
    const response = await axios.get(`${baseUrl}`, {
      params: {
        event: search,
        limit: 1000,
        offset: 0,
      },
    })

    const data = response.data

    if (!data.events || data.events.length === 0) {
      return {
        events: [],
        total_pages: 0,
        total_events: 0
      }
    }

    const cleanedEvents: Events[] = data.events.map((event: Events) => ({
      ...event,
      category: event.category || 'Uncategorized',
      club: event.club || 'TBA',
      description: event.description || '',
      end_date: event.end_date || 'TBA',
      featured: event.featured || false,
      image: event.image ? event.image.trim() : '/images/riviera.png',
      name: event.name || 'Untitled Event',
      on_hold: event.on_hold || false,
      pid: event.pid || '',
      price_per_ticket: event.price_per_ticket || 0,
      start_date: event.start_date || 'TBA',
      team_size: event.team_size || 'N/A',
      total_prize: event.total_prize,
      venues: event.venues || ['TBA'],
      event_type: '',
      searchTerm: search
    }))

    return {
      events: cleanedEvents,
      total_pages: 1,
      total_events: cleanedEvents.length
    }
  } catch (error) {
    console.error('Failed to search events:', error)
    throw new Error('Failed to search events')
  }
}

const bufferProps = {
  backgroundImage: "/images/eventsHeader.png",
  title: "EXTERNAL EVENTS",
  description: "Discover the latest events happening around you. Stay updated and never miss out!",
}
export const metadata: Metadata = {
  title: 'External Events - Riviera 2025',
  description: 'Explore and participate in exciting internal events at Riviera 2025, VIT Vellore\'s annual techno-cultural fest.',
  openGraph: {
    title: 'External Events - Riviera 2025',
    description: 'Discover and join thrilling internal events at Riviera 2025, VIT Vellore\'s premier annual festival.',
    images: [
      {
        url: '/image/riviera.png',
        width: 1200,
        height: 630,
        alt: 'Riviera 2025 External Events',
      },
    ],
    locale: 'en_US',
    type: 'website',
    siteName: 'Riviera 2025',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Internal Events - Riviera 2025',
    description: 'Explore exciting External events at Riviera 2025, VIT Vellore\'s annual techno-cultural extravaganza.',
    images: ['/image/riviera.png'],
    creator: '@RivieraVIT',
    site: '@RivieraVIT',
  },
  keywords: ['Riviera 2025', 'VIT Vellore', 'External events', 'college fest', 'techno-cultural events', 'student activities'],
  authors: [{ name: 'VIT University' }],
  category: 'Events',
  alternates: {
    canonical: 'https://riviera.vit.ac.in/events',
  },
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const resolvedSearchParams: { [key: string]: string | string[] | undefined } =
    await Promise.resolve(searchParams);

  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page as string, 10)
    : 1;
  const category = (resolvedSearchParams.category as string) || 'all';
  const search = (resolvedSearchParams.search as string) || '';
  const event_type = (resolvedSearchParams.event_type as string) || 'external_misc';
  let events, total_pages, total_events

  if (search) {
    const searchResults = await searchEvents(search)
    events = searchResults.events
    total_pages = searchResults.total_pages
    total_events = searchResults.total_events
  } else {
    const eventResults = await getEvents(page, category, event_type)
    events = eventResults.events
    total_pages = eventResults.total_pages
    total_events = eventResults.total_events
  }

  const baseUrl = `/externalEvents?${new URLSearchParams({ category, search, event_type }).toString()}&`

  return (
    <>
      <BufferSection {...bufferProps} />
      <div className="min-h-screen bg-background px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-7xl mx-auto mt-[100vh]">
          </div>
          <SearchForm defaultCategory={category} defaultSearch={search} />

          {!search && <EventTabs category={category} search={search} event_type={event_type} />}

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

          {total_pages > 0 && !search && (
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

