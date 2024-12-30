import { EventCard } from '@/components/EventCard'
import { Pagination } from '@/components/Pagination'
import { Events, EventsResponse } from '@/types/events'

// Dummy data for demonstration
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

// This would typically be an API call
async function getEvents(page: number, category: string, search: string): Promise<EventsResponse> {
  let filteredEvents = dummyEvents

  if (category && category !== 'all') {
    filteredEvents = filteredEvents.filter(event => event.category.toLowerCase() === category.toLowerCase())
  }

  if (search) {
    filteredEvents = filteredEvents.filter(event => 
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase())
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
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1
  const category = typeof searchParams.category === 'string' ? searchParams.category : 'all'
  const search = typeof searchParams.search === 'string' ? searchParams.search : ''

  const { events, total_pages } = await getEvents(page, category, search)

  const baseUrl = `/events?${new URLSearchParams({ category, search }).toString()}&`

  return (
    <div className="min-h-screen bg-[#1E1E1E] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl md:text-7xl font-bold text-center text-[#853BFF] mb-12 font-editorial">
          EVENTS
        </h1>
        
        {/* Filters */}
        <form className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <select
            name="category"
            defaultValue={category}
            className="w-full md:w-[200px] bg-zinc-900 border border-zinc-700 text-zinc-100 rounded-lg px-3 py-2"
          >
            <option value="all">All Events</option>
            <option value="technical">Technical</option>
            <option value="non-technical">Non Technical</option>
          </select>
          
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search Event"
              defaultValue={search}
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
          <button type="submit" className="sr-only">Search</button>
        </form>
        
        {/* Events List */}
        <div className="space-y-8">
          {events.map((event) => (
            <EventCard key={event.pid} event={event} />
          ))}
        </div>
        
        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={total_pages}
          baseUrl={baseUrl}
        />
      </div>
    </div>
  )
}

