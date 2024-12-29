import React, { useState, useEffect } from "react";
import EventCard from "../EventCard";
import MobileEventCard from "../MobileEventCard";

export default function EventList({ events }: { events: any[] }) {
  useEffect(() => {}, [events]);
  return (
    <div>
      <div className="flex flex-col gap-[1.5rem] md:gap-[3.5rem]">
        {events.map((event) => {
          // event.start_date = new Date(event.start_date);
          // event.end_date = new Date(event.end_date);
          return(
            <>
            <div className="block md:hidden">
              <MobileEventCard key={event._id} event={event} />
            </div>
            <div className="hidden md:block">
              <EventCard key={event._id} event={event} />
            </div>
            </>
          );
        })}
      </div>
      <div className="p-3" />
    </div>
  );
}
