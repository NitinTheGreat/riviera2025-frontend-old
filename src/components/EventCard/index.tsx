'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Events } from '@/types/events'
import { Calendar, Users, MapPin } from 'lucide-react'

export function EventCard({ event }: { event: Events }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldShowReadMore = event.description.length > 150

  return (
    <div className="relative w-full max-w-6xl mx-auto my-8">
      <div 
        className="relative bg-zinc-900"
        style={{
          padding: '3px',
          maskImage: `
            radial-gradient(circle at center top, transparent 20px, black 20px),
            radial-gradient(circle at center bottom, transparent 20px, black 20px),
            radial-gradient(circle at left 25%, transparent 20px, black 20px),
            radial-gradient(circle at left 50%, transparent 20px, black 20px),
            radial-gradient(circle at left 75%, transparent 20px, black 20px),
            radial-gradient(circle at right 25%, transparent 20px, black 20px),
            radial-gradient(circle at right 50%, transparent 20px, black 20px),
            radial-gradient(circle at right 75%, transparent 20px, black 20px)
          `,
          WebkitMaskImage: `
            radial-gradient(circle at center top, transparent 20px, black 20px),
            radial-gradient(circle at center bottom, transparent 20px, black 20px),
            radial-gradient(circle at left 25%, transparent 20px, black 20px),
            radial-gradient(circle at left 50%, transparent 20px, black 20px),
            radial-gradient(circle at left 75%, transparent 20px, black 20px),
            radial-gradient(circle at right 25%, transparent 20px, black 20px),
            radial-gradient(circle at right 50%, transparent 20px, black 20px),
            radial-gradient(circle at right 75%, transparent 20px, black 20px)
          `,
          WebkitMaskComposite: 'source-over',
          maskComposite: 'source-over',
          background: 'white'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-zinc-900 p-8">
          {/* Left Column - Logo */}
          <div className="relative aspect-square max-w-sm mx-auto w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-950 rounded-full">
              <Image
                src={event.image}
                alt={event.name}
                width={400}
                height={400}
                className="p-8"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 text-white">
            <h1 className="text-4xl font-bold tracking-tight">
              {event.name}
            </h1>
            
            <h2 className="text-2xl">{event.club}</h2>
            
            <div className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full">
              <span className="font-mono">₹</span>
              <span className="font-bold">{event.total_prize}</span>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              {isExpanded ? event.description : `${event.description.slice(0, 150)}${!isExpanded ? '...' : ''}`}
              {shouldShowReadMore && (
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-400 hover:underline ml-2"
                >
                  {isExpanded ? 'Show less' : 'Read more......'}
                </button>
              )}
            </p>

            {/* Event Details */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-700 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="opacity-75">{event.start_date} - {event.end_date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="opacity-75">{event.team_size} Members</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="opacity-75">{event.venues.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="opacity-75">Rs. {event.price_per_ticket}/-</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

