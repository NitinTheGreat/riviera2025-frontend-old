import { HeaderSkeleton } from '@/components/HeaderSkeleton'
import { EventCardSkeleton } from '@/components/EventCardSkeleton'
import { PaginationSkeleton } from '@/components/PaginationSkeleton'

export default function Loading() {
  return (
    <>
      <HeaderSkeleton />
      <div className="min-h-screen bg-background px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {Array.from({ length: 10 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
          <PaginationSkeleton />
        </div>
      </div>
    </>
  )
}