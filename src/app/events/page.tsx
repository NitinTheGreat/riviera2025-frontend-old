import { Suspense } from 'react'
import { EventCard } from '@/components/EventCard'
import { Pagination } from '@/components/Pagination'
import { EventCardSkeleton } from '@/components/EventCardSkeleton'
import { PaginationSkeleton } from '@/components/PaginationSkeleton'
import { SearchForm } from '@/components/Search-form'
import { Events, EventsResponse } from '@/types/events'
import EventList from '@/components/TempComp/EventList'
import Header from '@/components/Header'

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
  // Simulating async derivation of searchParams
  const asyncSearchParams = await new Promise<{ [key: string]: string | string[] | undefined }>((resolve) => {
    setTimeout(() => resolve(searchParams), 100) // Example async delay
  })

  const page = asyncSearchParams.page ? parseInt(asyncSearchParams.page as string, 10) : 1
  const category = (asyncSearchParams.category as string) || 'all'
  const search = (asyncSearchParams.search as string) || ''

  const eventsData: EventsResponse = {
    events: [
      {
        category: "Informal",
        club: "Anchoring Club",
        description:
          "Join the exciting world of AdZap 2025, where creativity knows no limits! This fun-filled competition challenges participants to use humor, catchy jingles, and engaging stories to transform the art of advertising.",
        end_date: "",
        featured: false,
        image: "https://i.imgur.com/8tCPoSy.png",
        name: "AdZap 2025",
        on_hold: true,
        pid: "external_misc",
        price_per_ticket: 0,
        start_date: "",
        team_size: "3 - 5 Members",
        total_prize: "",
        venues: [],
        searchTerm: "AdZap 2025 Anchoring Club Advertising",
      },
      {
        category: "quiz_words_worth",
        club: "QUIZ CLUB",
        description:
          "The Riviera Fandom Quiz by DBQC is the ultimate showdown for fans of all things pop culture! From movies and TV shows to books, anime, and gaming, this quiz dives deep into the universes you love.",
        end_date: "",
        featured: false,
        image: "https://i.imgur.com/8Wu7Mql.jpeg",
        name: "Riviera X Fandom Quiz",
        on_hold: true,
        pid: "external_misc",
        price_per_ticket: 0,
        start_date: "",
        team_size: "2 Members",
        total_prize: "",
        venues: [],
        searchTerm: "Fandom Quiz DBQC Pop Culture",
      },
      {
        category: "quiz_words_worth",
        club: "QUIZ CLUB",
        description:
          "The Riviera Mythology Quiz by DBQC is your gateway to the world of gods, legends, and epic tales! From ancient myths and folklore to legendary heroes and divine sagas, this quiz tests your knowledge of timeless stories.",
        end_date: "",
        featured: false,
        image: "https://i.imgur.com/bY7Jmqz.jpeg",
        name: "Riviera X Mythology Quiz",
        on_hold: true,
        pid: "external_misc",
        price_per_ticket: 0,
        start_date: "",
        team_size: "2 Members",
        total_prize: "",
        venues: [],
        searchTerm: "Mythology Quiz DBQC Legends Epics",
      },
      {
        category: "quiz_words_worth",
        club: "QUIZ CLUB",
        description:
          "The Riviera India Quiz by DBQC is a celebration of India’s rich heritage and vibrant present, featuring questions on Indian culture, history, and current affairs.",
        end_date: "",
        featured: false,
        image: "https://i.imgur.com/fFIJ4Uj.jpeg",
        name: "Riviera X Indian Quiz",
        on_hold: true,
        pid: "external_misc",
        price_per_ticket: 0,
        start_date: "",
        team_size: "2 Members",
        total_prize: "",
        venues: [],
        searchTerm: "Indian Quiz DBQC Culture History",
      },
      {
        category: "quiz_words_worth",
        club: "QUIZ CLUB",
        description:
          "The Riviera General Quiz, the flagship event of DBQC, is the ultimate test of knowledge, skill, and teamwork, covering everything under the sun and beyond.",
        end_date: "",
        featured: false,
        image: "https://i.imgur.com/Ubg29NC.jpeg",
        name: "Riviera X General Quiz",
        on_hold: true,
        pid: "external_misc",
        price_per_ticket: 0,
        start_date: "",
        team_size: "2 Members",
        total_prize: "",
        venues: [],
        searchTerm: "General Quiz DBQC Knowledge Trivia",
      },
      {
        category: "adventure_sports",
        club: "SAE",
        description:
          "Unleash the speed, own the track! Get ready for a heart-pounding go-karting showdown that takes excitement to the next level.",
        end_date: "",
        featured: true,
        image: "https://i.imgur.com/LKBFjLG.jpeg",
        name: "Go-Karting",
        on_hold: false,
        pid: "external_misc",
        price_per_ticket: 0,
        start_date: "",
        team_size: "Solo",
        total_prize: "",
        venues: [],
        searchTerm: "Go-Karting SAE Racing",
      },
    ],
    total_pages: 1,
    total_events: 6,
  };
  // const { events, total_pages, total_events } = await getEvents(page, category, search)
  const { events, total_pages, total_events } = eventsData;


  const baseUrl = `/events?${new URLSearchParams({ category, search }).toString()}&`

  const headerProps = {
    backgroundImage: "/images/heroimg.png",
    title: "Events",
    description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  }

  return (
    <>
    <Header {...headerProps}/>
    <div className="min-h-screen bg-background px-4 py-8">
      
      <div className="max-w-7xl mx-auto mt-[100vh]">

        <SearchForm defaultCategory={category} defaultSearch={search} />

        <Suspense fallback={
          <div className="space-y-8">
            {Array.from({ length: 10 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        }>
          {/* <div className="space-y-8">
            {events.map((event, index) => (
              <EventCard key={event.pid} event={event} index={index} />
            ))}
          </div> */}
          <EventList events={events} />
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

// import Index from "@/components/TempComp/EventPage";

// function page() {
//   return (
//     <Index />
//   )
// }

// export default page