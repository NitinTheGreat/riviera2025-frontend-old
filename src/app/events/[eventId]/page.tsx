import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, IndianRupee } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordian"
import ClientWrapper from './ClientWrapper'
import { EventDetail } from "@/types"
import EventHeader from '@/components/SlotCard'

const baseUrl = process.env.Base_URL

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function formatDateTime(isoString: string) {
  // Create a date object in UTC
  const date = new Date(isoString);

  // Convert to IST (UTC+5:30)
  const istDate = new Date(date.getTime() + (5.5 * 60 * 60 * 1000));

  const timeString = istDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'UTC'
  });

  const dateString = istDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC'
  });

  return { time: timeString, date: dateString };
}


async function getEventData(slug: string): Promise<EventDetail> {
  const res = await fetch(`${baseUrl}/${slug}`, { next: { revalidate: 90 } })
  if (!res.ok) throw new Error('Failed to fetch event data')
  return res.json()
}

export async function generateMetadata(
  { params }: { params: { eventId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { eventId } = await params;
  const data = await getEventData(eventId);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${data.name} - Riviera 2025`,
    description: data.short_description,
    openGraph: {
      title: `${data.name} - Riviera 2025`,
      description: data.short_description,
      images: [
        {
          url: data.image,
          width: 1200,
          height: 630,
          alt: `${data.name} - Event Poster`,
        },
        ...previousImages
      ],
      locale: 'en_US',
      type: 'website',
      siteName: 'Riviera 2025',
      url: `https://riviera.vit.ac.in/events/${eventId}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name} - Riviera 2025`,
      description: data.short_description,
      images: [data.image],
      creator: '@RivieraVIT',
      site: '@RivieraVIT',
    },
    keywords: [`Riviera, VIT, ${data.name}, ${data.club}, event, college fest`],
    authors: [{ name: 'VIT University' }],
    category: 'Event',
    alternates: {
      canonical: `https://riviera.vit.ac.in/events/${eventId}`,
    },
  }
}

export default async function Page({ params }: { params: { eventId: string } }) {
  const { eventId } = await params;
  let data: EventDetail;

  try {
    data = await getEventData(eventId)
  } catch (error) {
    console.error('Error fetching event data:', error)
    notFound()
  }

  return (
    <div className="flex flex-col my-24">
      <div className="flex flex-col md:flex-row md:justify-start md:gap-12 gap-2">
        <div className="w-full mb-0 max-w-md h-auto mx-auto px-4 rounded-lg relative">
          <Image
            src={data.image}
            alt={`${data.name} Event Poster`}
            width={1000}
            height={1000}
            layout="responsive"
            objectFit="cover"
            className="w-full aspect-square h-auto"
          />
          <ClientWrapper eventSlug={eventId} />
          {data.event_type === "external_misc" && (
            <h1 className="font-editorial mt-1 text-center">
              *Only for external participants
            </h1>
          )}
        </div>
        <div className="w-full">
          <h1 className="font-fk-trial text-5xl font-extrabold">{data.name}</h1>
          <h2 className="font-fk-trial text-xl font-extrabold text-primary">
            {data.club}
          </h2>
          <hr className="mt-5" />
          <div className="flex items-center mt-4">
            <IndianRupee />
            <h3 className="text-2xl font-editorial ">{` ${numberWithCommas(
              data.price_per_ticket
            )} `}</h3>
            <span className="text-primary ml-2">
              {data.is_a_team_event ? "(per team)" : "(per person)"}
            </span>
          </div>
          <h3 className="text-primary text-2xl font-editorial">+18% GST</h3>
          <p className="my-3 font-editorial">{data.short_description}</p>
          <p className="my-3 font-editorial">{data.description}</p>

          <div className="grid sm:grid-cols-4 grid-cols-2 ">
            <div className="flex flex-col sm:col-span-3">
              <h3 className="font-fk-trial text-2xl font-bold text-primary">
                TEAM SIZE
              </h3>
              <h3 className="font-editorial">{data.number_of_participants}</h3>
            </div>
            <div className="flex flex-col sm:col-span-3">
              <h3 className="font-fk-trial uppercase text-2xl font-bold text-primary">
                slots
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                {data.slot_details && data.slot_details.length > 0 ? (
                  data.slot_details.map((slot, index) => {
                    const { time: startTime, date: startDate } = formatDateTime(slot.start_date);
                    const { time: endTime } = formatDateTime(slot.end_date);
                    return (
                      <EventHeader
                        key={`${slot.venue}-${index}`}
                        venue={slot.venue}
                        time={`${startTime} - ${endTime} IST`}
                        date={startDate}
                      />
                    );
                  })
                ) : (
                  <p className="text-primary font-editorial">No venues specified</p>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="rules">
          <AccordionTrigger className="font-fk-trial text-2xl font-bold text-primary">
            Rules
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm font-editorial whitespace-pre-line">{data.rules || "No rules specified."}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="judgement">
          <AccordionTrigger className="font-fk-trial text-2xl font-bold text-primary">
            Judgement Criteria
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm font-editorial">
              {data.judgement_criteria || "No judgement criteria specified."}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="fixed bottom-[7vh] left-0 w-full h-16 z-50 font-editorial">
        <div className="h-full w-full max-w-[70vw] md:max-w-[90%] mx-auto flex flex-row border-2 border-foreground bg-background">
          <div className="hidden md:flex flex-col justify-center items-start pl-2 w-1/4 border-r-2 border-foreground overflow-clip">
            <h1 className="font-bold text-lg text-foreground truncate text-ellipses w-full">
              {data?.name}
            </h1>
            <p className="text-sm text-primary truncate text-ellipses w-full">{data?.club}</p>
          </div>

          {data.slot_details && data.slot_details.length > 0 && (
            <>
              <div className="hidden md:flex items-center justify-center w-1/5 border-r-2 border-foreground gap-2">
                <Calendar className="text-primary" size={20} />
                <p className="text-foreground leading-none">{formatDateTime(data.slot_details[0].start_date).date}</p>
              </div>

              <div className="hidden md:flex items-center justify-center w-1/5 border-r-2 border-foreground gap-2">
                <Clock className="text-primary" size={20} />
                <p className="text-foreground">
                  {`${formatDateTime(data.slot_details[0].start_date).time} - ${formatDateTime(data.slot_details[0].end_date).time}`}
                </p>
              </div>
            </>
          )}

          <div className="flex items-center justify-center w-1/2 md:w-1/5 border-r-2 border-foreground gap-2">
            <IndianRupee className="text-primary" size={20} />
            <p className="text-foreground">
              {numberWithCommas(data.price_per_ticket)}/-
            </p>
          </div>

          <Link
            href={`${data?.event_type === "internal"
                ? "https://web.vit.ac.in/rivierainternal"
                : "https://web.vit.ac.in/riviera"
              }`}
            className="flex items-center justify-center w-1/2 md:w-1/5 bg-primary text-primary-foreground font-bold hover:opacity-90"
          >
            REGISTER &gt;
          </Link>
        </div>
      </div>
    </div>
  )
}
