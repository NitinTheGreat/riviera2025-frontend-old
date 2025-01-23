'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from "next/link"
import { ChevronRight } from 'lucide-react'

interface EventBreadcrumbProps {
  eventName: string
  eventType: "internal" | "external" | "external_misc"
}

const BreadcrumbItem: React.FC<{ children: React.ReactNode; isLast?: boolean }> = ({ children, isLast }) => (
  <li className={`inline-flex items-center ${!isLast ? 'text-muted-foreground' : 'text-foreground'}`}>
    {children}
  </li>
)

const BreadcrumbLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <Link href={href} className="hover:text-foreground transition-colors">
    {children}
  </Link>
)

const BreadcrumbSeparator = () => (
  <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
)

const Popover: React.FC<{ trigger: React.ReactNode; content: React.ReactNode }> = ({ trigger, content }) => {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block">
      <div 
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-50 mt-2 left-0 min-w-[8rem] rounded-md bg-white text-gray-900 shadow-md outline-none animate-in fade-in-0 zoom-in-95"
        >
          {content}
        </div>
      )}
    </div>
  )
}

export function EventBreadcrumb({ eventName, eventType }: EventBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 ml-4 md:ml-4">
      <ol className="flex items-center space-x-1 font-editorial text-sm md:text-xl ">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator /> 
        
        {/* <BreadcrumbItem>
          <Popover
            trigger={
              <button className="hover:text-foreground transition-colors">
                Events
              </button>
            }
            content={
              <div className="py-2 w-48">
                <Link 
                  href="/events" 
                  className="block px-4 py-2 text-sm hover:bg-gray-200 transition-colors"
                >
                  Internal Events
                </Link>
                <Link 
                  href="/externalEvents" 
                  className="block px-4 py-2 text-sm hover:bg-gray-200 transition-colors"
                >
                  External Events
                </Link>
              </div>
            }
          />
        </BreadcrumbItem> */}


        <BreadcrumbItem>
          {/* <BreadcrumbLink href={`/events`?eventType==='internal'?'/externalEvents':'external'}> */}
        <BreadcrumbLink href={eventType === "internal" ? "/events" : "/externalEvents"}>
            {eventType === "internal" ? "Internal Events" : "External Events"}
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem isLast>
          <span className="font-medium">{eventName}</span>
        </BreadcrumbItem>
      </ol>
    </nav>
  )
}
