'use client'

import { Events } from '@/types/events'
import { Users, Calendar, MapPin, IndianRupee } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

export function EventCard({ event, index }: { event: Events; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isExpanded, setIsExpanded] = useState(false)
  const searchParams = useSearchParams()
  const searchTerm = searchParams.get('search') || ''

  const description = event.description
  const shortDescription = description.slice(0, 150) + (description.length > 150 ? '...' : '')

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text
    }
    const regex = new RegExp(`(${highlight})`, 'gi')
    return text.split(regex).map((part, i) => 
      regex.test(part) ? <mark key={i} className="bg-yellow-200 text-black">{part}</mark> : part
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative"
    >
      {/* Decorative border pattern */}
      <div className="absolute inset-0 bg-[#1E1E1E]">
        <div className="absolute inset-0">
          <svg width="100%" height="100%" className="absolute inset-0">
            <motion.path
              d="M0,0 L20,0 Q40,0 40,20 L40,40 Q40,60 60,60 L100,60 Q120,60 120,80 L120,100 Q120,120 140,120 L160,120"
              fill="none"
              stroke="rgba(133, 59, 255, 0.5)"
              strokeWidth="2"
              className="absolute left-0 top-0"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,100 L20,100 Q40,100 40,80 L40,60 Q40,40 60,40 L100,40 Q120,40 120,20 L120,0"
              fill="none"
              stroke="rgba(133, 59, 255, 0.5)"
              strokeWidth="2"
              className="absolute right-0 bottom-0"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative grid grid-cols-1 md:grid-cols-[300px,1fr] gap-6 bg-[#1E1E1E] p-6 rounded-lg border border-zinc-800">
        {/* Image section */}
        <motion.div 
          className="relative aspect-square rounded-full overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={event.image}
            alt={event.name}
            width={300}
            height={300}
            className="w-full h-full object-contain"
            loading={index === 0 ? "eager" : "lazy"}
            priority={index === 0}
          />
        </motion.div>

        {/* Content section */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            {/* Title and club */}
            <div>
              <h3 className="text-3xl font-bold text-primary-foreground font-editorial">
                {highlightText(event.name, searchTerm)}
              </h3>
              <p className="text-xl text-zinc-400">{event.club}</p>
            </div>

            {/* Prize badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 w-fit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IndianRupee className="w-4 h-4 text-primary-foreground" />
              <span className="text-primary-foreground font-medium">{event.total_prize}</span>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ height: 'auto' }}
              animate={{ height: 'auto' }}
              className="text-primary-foreground"
            >
              <p>
                {highlightText(isExpanded ? description : shortDescription, searchTerm)}
                {description.length > 150 && (
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-primary ml-2 hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#1E1E1E] rounded"
                  >
                    {isExpanded ? 'Show less' : 'Read more.....'}
                  </button>
                )}
              </p>
            </motion.div>
          </div>

          {/* Footer info */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-primary-foreground">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <MapPin className="w-4 h-4" />
              <span>{event.venues.join(', ')}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Calendar className="w-4 h-4" />
              <span>{formatDate(event.start_date)} - {formatDate(event.end_date)}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Users className="w-4 h-4" />
              <span>{event.team_size}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <IndianRupee className="w-4 h-4" />
              <span>Rs. {event.price_per_ticket}/-</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

