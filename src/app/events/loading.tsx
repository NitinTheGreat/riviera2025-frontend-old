import { EventCardSkeleton } from '@/components/EventCardSkeleton'
import { PaginationSkeleton } from '@/components/PaginationSkeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#1E1E1E] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="h-16 w-3/4 bg-zinc-800 rounded mx-auto mb-12 animate-pulse" />
        
        {/* Filters Skeleton */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8 animate-pulse">
          <div className="w-full md:w-[200px] h-10 bg-zinc-800 rounded" />
          <div className="w-full md:w-[300px] h-10 bg-zinc-800 rounded" />
        </div>
        
        {/* Events List Skeleton */}
        <div className="space-y-8">
          <EventCardSkeleton />
          <EventCardSkeleton />
        </div>
        
        {/* Pagination Skeleton */}
        <PaginationSkeleton />
      </div>
    </div>
  )
}

