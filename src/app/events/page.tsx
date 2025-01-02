import { Suspense } from 'react'
import { EventCard } from '@/components/EventCard'
import { Pagination } from '@/components/Pagination'
import { EventCardSkeleton } from '@/components/EventCardSkeleton'
import { PaginationSkeleton } from '@/components/PaginationSkeleton'
import { Events, EventsResponse } from '@/types/events'
import { SearchForm } from '@/components/Search-form'

// Dummy data
const dummyEvents: Events[] = [
  {
    category: "Non Technical",
    club: "VIT Dance Club",
    description: "Rhythm of Roots is a celebration of India's rich cultural heritage through the vibrant art of folk dance. This competition invites talented performers to showcase their skills and passion for traditional dance forms from across the nation.",
    end_date: "1st Mar",
    featured: true,
    image: "/placeholder.svg?height=400&width=400",
    name: "RHYTHM OF ROOTS-FOLK DANCE COMPETITION",
    on_hold: false,
    pid: "1",
    price_per_ticket: 1000,
    start_date: "29th Feb",
    team_size: "2-4",
    total_prize: "1,00,000",
    venues: ["Multiple Slots"]
  },
  {
    category: "Technical",
    club: "VIT Coding Club",
    description: "Join us for an exciting hackathon where you can showcase your coding skills and innovative ideas. Solve real-world problems and compete with the best minds in the field.",
    end_date: "3rd Mar",
    featured: true,
    image: "/placeholder.svg?height=400&width=400",
    name: "CODE FUSION HACKATHON",
    on_hold: false,
    pid: "2",
    price_per_ticket: 500,
    start_date: "1st Mar",
    team_size: "3-5",
    total_prize: "2,00,000",
    venues: ["Main Auditorium"]
  }
]

async function getEvents(page: number, category: string, search: string): Promise<EventsResponse> {
  'use server'
  
  await new Promise(resolve => setTimeout(resolve, 500))

  let filteredEvents = [...dummyEvents]

  if (category && category !== 'all') {
    filteredEvents = filteredEvents.filter(event => 
      event.category.toLowerCase().replace(' ', '-') === category.toLowerCase()
    )
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredEvents = filteredEvents.sort((a, b) => {
      const aTitleMatch = a.name.toLowerCase().includes(searchLower)
      const bTitleMatch = b.name.toLowerCase().includes(searchLower)
      
      if (aTitleMatch && !bTitleMatch) return -1
      if (!aTitleMatch && bTitleMatch) return 1
      
      const aDescMatch = a.description.toLowerCase().includes(searchLower)
      const bDescMatch = b.description.toLowerCase().includes(searchLower)
      
      if (aDescMatch && !bDescMatch) return -1
      if (!aDescMatch && bDescMatch) return 1
      
      return 0
    }).filter(event => 
      event.name.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower)
    )
  }

  const eventsPerPage = 2
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
  const startIndex = (page - 1) * eventsPerPage
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage)

  return {
    events: paginatedEvents,
    total_pages: totalPages
  }
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const params = await searchParams
  const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1
  const category = typeof params.category === 'string' ? params.category : 'all'
  const search = typeof params.search === 'string' ? params.search : ''

  const baseUrl = `/events?${new URLSearchParams({ category, search }).toString()}&`

  return (
    <div className="min-h-screen bg-[#1E1E1E] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-center text-[#853BFF] mb-12 font-editorial">
          EVENTS
        </h1>
        
        <SearchForm defaultCategory={category} defaultSearch={search} />
        
        <Suspense fallback={
          <>
            <EventCardSkeleton />
            <EventCardSkeleton />
          </>
        }>
          <EventsList page={page} category={category} search={search} />
        </Suspense>
        
        <Suspense fallback={<PaginationSkeleton />}>
          <PaginationWrapper page={page} category={category} search={search} baseUrl={baseUrl} />
        </Suspense>
      </div>
    </div>
  )
}

async function EventsList({ page, category, search }: { 
  page: number
  category: string
  search: string 
}) {
  const { events } = await getEvents(page, category, search)
  
  return (
    <div className="space-y-8">
      {events.map((event) => (
        <EventCard 
          key={event.pid} 
          event={event} 
          searchTerm={search}
        />
      ))}
    </div>
  )
}

async function PaginationWrapper({ page, category, search, baseUrl }: { 
  page: number
  category: string
  search: string
  baseUrl: string 
}) {
  const { total_pages } = await getEvents(page, category, search)
  
  return (
    <Pagination
      currentPage={page}
      totalPages={total_pages}
      baseUrl={baseUrl}
    />
  )
}

