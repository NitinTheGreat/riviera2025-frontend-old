'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const EventTabs = ({ category, search, event_type }: { category: string, search: string, event_type: string }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const tabs = [
    { name: 'Competitions', type: 'external_misc' },
    { name: 'Sports', type: 'external_sports' },
    { name: 'Informal', type: 'external' },
  ]

  const handleTabClick = (tabType: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('event_type', tabType)
    params.set('page', '1') 
  
    if (category) params.set('category', category)
    if (search) params.set('search', search)
  
    router.push(`/externalEvents?${params.toString()}`, { scroll: false })
  }

  // If no event_type is provided or if it's not one of the valid types, default to 'external_misc' (Competitions)
  const currentEventType = tabs.some(tab => tab.type === event_type) ? event_type : 'external_misc'

  // Set default tab on initial render
  useEffect(() => {
    if (!event_type) {
      handleTabClick('external_misc')
    }
  }, [])

  return (
    <div className="border-b mb-8">
      <nav className="flex space-x-8" aria-label="Event Types">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleTabClick(tab.type)}
            className={`py-4 px-1 border-b-2 text-lg md:text-xl xl:text-2xl font-medium transition-colors hover:border-primary/50 ${
              currentEventType === tab.type
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  )
}

