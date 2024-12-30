import Image from 'next/image'
import { Events } from '@/types/events'

interface EventCardProps {
  event: Events
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-[#853BFF]/20 to-[#853BFF]/20 rounded-[2rem]" />
      <div className="relative bg-[#1E1E1E] rounded-[2rem] overflow-hidden border border-[#853BFF]/20">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Image */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="relative aspect-square">
              <Image
                src={event.image}
                alt={event.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white font-editorial">
                  {event.name}
                </h2>
                <p className="text-xl text-zinc-400">{event.club}</p>
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#853BFF]/10 backdrop-blur-sm shrink-0">
                <span className="text-white whitespace-nowrap">₹ {event.total_prize}</span>
              </div>
            </div>
            
            <p className="text-zinc-300">
              {event.description.slice(0, 150)}...
              <span className="text-[#853BFF] hover:text-[#853BFF]/80 ml-1 cursor-pointer">
                Read more.....
              </span>
            </p>
            
            {/* Event Details */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-400">
              <div className="flex items-center gap-1">
                <span>{event.venues.join(', ')}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{event.start_date} - {event.end_date}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{event.team_size} Members</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Rs. {event.price_per_ticket}/-</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Border */}
      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#1E1E1E] rounded-full" />
      <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#1E1E1E] rounded-full" />
    </div>
  )
}

