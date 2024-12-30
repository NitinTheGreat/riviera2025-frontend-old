export function EventCardSkeleton() {
    return (
      <div className="relative mb-8 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-[#853BFF]/20 to-[#853BFF]/20 rounded-[2rem]" />
        <div className="relative bg-[#1E1E1E] rounded-[2rem] overflow-hidden border border-[#853BFF]/20">
          <div className="flex flex-col md:flex-row gap-6 p-6">
            {/* Image Skeleton */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="relative aspect-square bg-zinc-800 rounded-lg" />
            </div>
            
            {/* Content Skeleton */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="h-8 w-3/4 bg-zinc-800 rounded" />
                  <div className="h-6 w-1/2 bg-zinc-800 rounded mt-2" />
                </div>
                <div className="h-8 w-24 bg-zinc-800 rounded-full" />
              </div>
              
              <div className="space-y-2">
                <div className="h-4 bg-zinc-800 rounded" />
                <div className="h-4 bg-zinc-800 rounded" />
                <div className="h-4 w-2/3 bg-zinc-800 rounded" />
              </div>
              
              {/* Event Details Skeleton */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 w-20 bg-zinc-800 rounded" />
                ))}
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
  
  