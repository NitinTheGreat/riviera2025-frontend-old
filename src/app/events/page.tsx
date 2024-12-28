import { getAllEvents } from "@/services/events.services";

export default async function EventsPage() {
  const eventsResp = await getAllEvents("something");
  const events = eventsResp.events;

  return (
    <div>
      <p className="text-5xl mx-auto font-fk-trial font-black">
        Riviera 2025 - Events
      </p>
      <div>
        {events?.map((event) => (
          <div key={event.pid} className="border-2 border-black p-4">
            <p className="">{event.name}</p>
            <p className="">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
