"use client"
import { EventDetail } from '@/types'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { IndianRupee } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordian"


function numberWithCommas(x:number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ({ params }: { params: { slug: string } }){
  const slug = params.slug
  const [data, setData] = useState<EventDetail>({
    "category": "external",
    "club": "Dance Club",
    "description": "From dance sizzle to live fire - Frisk Factor puts your crew's moves to the test! Craft killer moves, then crush the stage in epic 6-8 minute battles. Top teams reign supreme, so bring your best game!",
    "event_type": "external",
    "featured": false,
    "image": "https://i.imgur.com/r6odNPR.jpg",
    "is_a_team_event": true,
    "judgement_criteria": "Choreography, Energy, Synchronisation, Expressions, Stage utilisation and stage presence, Innovation in selection of songs, props, and costumes, execution, and overall impact.",
    "name": "Frisk Factor",
    "number_of_participants": "10-25 Members",
    "pid": "5726",
    "price_per_ticket": 3000,
    "prizes": "175000",
    points:"1000",
    "rules": "Team size: 10-25\n Number of rounds: 2\n \n Round 1: Elimination\n  1. Offline prelims will be conducted. Any dance style is allowed.\n  2. Time limit is 3 to 5.30mins.\n  3. Usage of props is allowed.\n  4. Mixing of tracks is allowed.\n  5. No vulgarity or obscenity will be entertained.\n  6. All members of the team must be present on the stage for at-least 10 seconds.\n \n Performances will be judged and the best teams will qualify for the final round. \n \n Round 2: Finals\n  Final round of the competition. Any dance style is allowed.\n 1. Time limit is 6 to 8mins.\n 2. Usage of props is allowed as long as they don't harm the stage. Any loss/damage of the props will not be the responsibility of the coordinators.\n 3. Any kind of dangerous objects like flames, powders or fluids are strictly prohibited.\n 4. Mixing of tracks is allowed.\n 5. Maximum number of people allowed on stage is 25.\n 6. No vulgarity or obscenity will be entertained.\n 7. Any kind of indisciplinary action from the participants during the course of performance or other times will lead to disqualification.\n 8. Failure to follow the above rules will result in heavy penalties.\n 9. The decision of the judges shall be final and binding.",
    "short_description": "A brilliant platform to showcase various dance styles as a group, where the best of the teams compete for the best prizes.",
    "slot_details": [
        {
            "end_date": "2024-03-01T11:30:00Z",
            "start_date": "2024-03-01T03:30:00Z",
            "venue": "Prelims - Mahatma Gandhi Block Auditorium"
        }
    ]
});

  // useEffect(() => {
  //   const fetchData = async () => {
  //     //make a function to update he data using ss logic
  //   }
  //   fetchData();
  // }, []);

  if (!data) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className='flex flex-col mt-16'>
      <div className='flex flex-col sm:flex-row gap-20'>
        <div className="h-96 aspect-square relative">
          <Image
            src={data.image}
            alt="Event Poster"
            layout="fill"
            className="border-foreground border-2"
          />
          {data.category === "external" && (
            <h1 className="absolute bottom-0 font-editorial text-center">
              *Only for external participants
            </h1>
          )}
        </div>
        <div className='w-full'>
          <h1 className='font-fk-trial text-5xl font-extrabold'>{data.name}</h1>
          <h2 className='font-fk-trial text-xl font-extrabold text-primary'>{data.club}</h2>
          <hr className='mt-5'/>
          <div className='flex items-center mt-2'>
            <IndianRupee />
            <h3 className='text-2xl font-editorial '>{` ${numberWithCommas(data.price_per_ticket)} `}</h3>
            <span className='text-primary ml-2'>{data.is_a_team_event?"(per team)":"(per person)"}</span>
          </div>
          <h3 className='text-primary text-2xl font-editorial'>+18% GST</h3>
          <p className='my-3 font-editorial'>{data.short_description}</p>
          <div className='flex flex-col w-full'>
            <div className='flex flex-row items-center gap-10'>
              <div className='w-1/6'>
                <h3 className='font-fk-trial text-2xl font-bold text-primary'>VENUE</h3>
                <h3>None</h3>
              </div>
              <div className='w-1/6'>
                <h3 className='font-fk-trial text-2xl font-bold text-primary'>TOTAL PARTICIPANTS</h3>
                <h3>{data.number_of_participants}</h3>
              </div>
            </div>
            <div className='flex flex-row items-center gap-10'>
              <div className='w-1/6'>
                <h3 className='font-fk-trial text-2xl font-bold text-primary'>PRIZE POOL</h3>
                <div className='flex items-center'>
                  <IndianRupee/>
                  {` ${numberWithCommas(Number(data.prizes))} `}
                </div>
              </div>
              <div className='w-1/6'>
                <h3 className='font-fk-trial text-2xl font-bold text-primary'>POINTS</h3>
                <h3>{data.points}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-5'>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}