"use client";
import { EventDetail } from "@/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, IndianRupee } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordian";
import Link from "next/link";
import SlotCard from "@/components/SlotCard";
import { details } from "motion/react-client";


function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const [data, setData] = useState<EventDetail>({
    category: "external",
    club: "Dance Club",
    description:
      "From dance sizzle to live fire - Frisk Factor puts your crew's moves to the test! Craft killer moves, then crush the stage in epic 6-8 minute battles. Top teams reign supreme, so bring your best game!",
    event_type: "external",
    featured: false,
    image: "https://i.imgur.com/r6odNPR.jpg",
    is_a_team_event: true,
    judgement_criteria:
      "Choreography, Energy, Synchronisation, Expressions, Stage utilisation and stage presence, Innovation in selection of songs, props, and costumes, execution, and overall impact.",
    name: "Frisk Factor",
    number_of_participants: "10-25 Members",
    pid: "5726",
    price_per_ticket: 3000,
    prizes: "175000",
    points: "1000",
    rules:
      "Team size: 10-25\n Number of rounds: 2\n \n Round 1: Elimination\n  1. Offline prelims will be conducted. Any dance style is allowed.\n  2. Time limit is 3 to 5.30mins.\n  3. Usage of props is allowed.\n  4. Mixing of tracks is allowed.\n  5. No vulgarity or obscenity will be entertained.\n  6. All members of the team must be present on the stage for at-least 10 seconds.\n \n Performances will be judged and the best teams will qualify for the final round. \n \n Round 2: Finals\n  Final round of the competition. Any dance style is allowed.\n 1. Time limit is 6 to 8mins.\n 2. Usage of props is allowed as long as they don't harm the stage. Any loss/damage of the props will not be the responsibility of the coordinators.\n 3. Any kind of dangerous objects like flames, powders or fluids are strictly prohibited.\n 4. Mixing of tracks is allowed.\n 5. Maximum number of people allowed on stage is 25.\n 6. No vulgarity or obscenity will be entertained.\n 7. Any kind of indisciplinary action from the participants during the course of performance or other times will lead to disqualification.\n 8. Failure to follow the above rules will result in heavy penalties.\n 9. The decision of the judges shall be final and binding.",
    short_description:
      "A brilliant platform to showcase various dance styles as a group, where the best of the teams compete for the best prizes.",
    slot_details: [
      {
        end_date: "2024-03-01T11:30:00Z",
        start_date: "2024-03-01T03:30:00Z",
        venue: "Prelims - Mahatma Gandhi Block Auditorium",
      },
    ],
  });
  const startTime = new Date(data.slot_details[0].start_date);
  const endTime = new Date(data.slot_details[0].end_date);
  const startDate = startTime.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
  const startTimeString = startTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  const endTimeString = endTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
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
    <div className="flex flex-col mt-16">
      <div className="flex flex-col sm:flex-row gap-20">
        <div className="h-[25rem] aspect-square relative">
          <Image
            src={data.image}
            alt="Event Poster"
            layout="fill"
            className="border-foreground border-2"
          />
          {data.category === "external" && (
            <h1 className="absolute -bottom-6 font-editorial text-center">
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
          <div className="flex items-center mt-2">
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
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center gap-10">
              <div className="w-1/6">
                <h3 className="font-fk-trial text-2xl font-bold text-primary">
                  VENUE
                </h3>
                <h3 className="font-editorial">None</h3>
              </div>
              <div className="w-1/6">
                <h3 className="font-fk-trial text-2xl font-bold text-primary">
                  TOTAL PARTICIPANTS
                </h3>
                <h3 className="font-editorial">{data.number_of_participants}</h3>
              </div>
            </div>
            <div className="flex flex-row items-center gap-10">
              <div className="w-1/6">
                <h3 className="font-fk-trial text-2xl font-bold text-primary">
                  PRIZE POOL
                </h3 >
                <div className="flex items-center font-editorial">
                  <IndianRupee />
                  {` ${numberWithCommas(Number(data.prizes))} `}
                </div>
              </div>
              <div className="w-1/6">
                <h3 className="font-fk-trial text-2xl font-bold text-primary">
                  POINTS
                </h3>
                <h3 className="font-editorial">{data.points}</h3>
              </div>
            </div>
          </div>
          <div className=" flex gap-5">
            <SlotCard venue={data.slot_details[0].venue} startDate={startDate} startTimeString={startTimeString} endTimeString={endTimeString}></SlotCard>
            <SlotCard venue={data.slot_details[0].venue} startDate={startDate} startTimeString={startTimeString} endTimeString={endTimeString}></SlotCard>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              {/* add support for markdown */}
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div
        className="fixed bottom-[5vh] left-0 w-full  h-16 z-50 font-editorial bg-background  border-foreground flex justify-center items-center"
      >
        <div className="h-full w-full max-w-7xl flex flex-row justify-center">
          {/* Event Name and Club */}
          <div className="hidden md:flex flex-col justify-center items-start pl-4 w-1/4 border-2 border-foreground">
            <h1 className="font-bold text-lg text-foreground truncate">{data.name}</h1>
            <p className="text-sm text-primary truncate">{data.club}</p>
          </div>

          {/* Date */}
          <div className="hidden md:flex items-center justify-center w-1/5 border-y-2 border-foreground gap-2">
            <Calendar className="text-primary mr-2"/>
            <p className="text-foreground">{startDate}</p>
          </div>

          {/* Time */}
          <div className="hidden md:flex items-center justify-center w-1/5 border-2 border-foreground gap-2">
            <Clock className="text-primary mr-2" />
            <p className="text-foreground">
              {startTimeString} - {endTimeString}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center justify-center w-1/4 md:w-1/5 border-2 border-l-0 border-foreground gap-2">
            <IndianRupee className="text-primary"></IndianRupee>
            <p className=" text-foreground">
             {numberWithCommas(data.price_per_ticket)}/-
            </p>
          </div>

          {/* Register Button */}
          <Link
            href={`${
              data.event_type === "internal"
                ? "https://web.vit.ac.in/rivierainternal"
                : "https://web.vit.ac.in/riviera"
            }`}
            className="flex items-center justify-center w-1/4 md:w-1/5 bg-primary text-primary-foreground font-bold text-sm hover:opacity-90"
          >
            REGISTER &gt;
          </Link>
        </div>
      </div>

    </div>
  );
}
