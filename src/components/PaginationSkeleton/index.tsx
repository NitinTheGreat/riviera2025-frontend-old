export function PaginationSkeleton() {
    return (
      <div className="flex items-center justify-center gap-2 mt-8 animate-pulse">
        <div className="w-20 h-10 bg-zinc-800 rounded-lg" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-10 h-10 bg-zinc-800 rounded-lg" />
        ))}
        <div className="w-20 h-10 bg-zinc-800 rounded-lg" />
      </div>
    )
  }
  
  