/* eslint-disable @next/next/no-img-element */
"use client"
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Space_Grotesk } from "next/font/google";
// import EventCard from "@/components/EventCard";\
import EventList from "@/components/TempComp/EventList";
import axios from "axios";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

interface Event {
  category: string;
  club: string;
  coordinator1_email: string;
  coordinator1_phone: string;
  description: string;
  end_date: string;
  featured: boolean;
  image: string;
  name: string;
  on_hold: boolean;
  pid: string;
  price_per_ticket: number;
  start_date: string;
}

export default function Index() {
  // require("dotenv").config();
  const [width, setWidth] = useState("100%");
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getEvents();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const getEvents = async () => {
    try {
      const response = await axios.get(`${baseURL}/events/?event=${search}`);
      setEvents(response.data.events);
      console.log(events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const updateProgressBar = () => {
      const scrollTotal =
        document.documentElement.scrollHeight - window.innerHeight;
      const width = `${(1 - window.scrollY / scrollTotal) * 100}%`;
      setWidth(width);
    };

    window.addEventListener("scroll", updateProgressBar);

    return () => {
      window.removeEventListener("scroll", updateProgressBar);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Riviera &apos;24 | Events</title>
      </Head>
      <div className="w-full md:mt-40 mt-24 lg:px-[5rem] md:px-6 sm:px-8 px-4 flex flex-col items-center relative bg-[#111111]">
        <h1 className="text-white uppercase font-oddval text-[2.5rem] w-auto md:max-w-[50vw] md:text-[3.5rem] font-bold md:mt-0 mt-10 flex flex-row self-center justify-center text-center">
          <img
            src="/lightning bolt.svg"
            className="w-[10%] p-1 mx-0 md:mx-4"
            alt="Lightning bolt"
          />
          <p className="whitespace-nowrap">all events</p>
          <img
            src="/lightning bolt.svg"
            className="w-[10%] p-1 mx-0 md:mx-4"
            alt="lightning bolt"
          />
        </h1>
        <div className="w-full mt-[2rem] flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center bg-[#1E1E1E] text-white w-[50%] md:w-[25%] h-auto border border-[#ffffff] rounded-none">
            <img
              className="h-max-[60%] m-4 w-auto"
              alt="search"
              src="/search.svg"
            />
            <input
              type="search"
              placeholder="Search Event"
              className="bg-[#1E1E1E] text-white w-full text-[1.375rem] pr-4 h-10 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* <div className="h-[100%] m-0 border border-[#ffffff] rounded-none w-[25%] md:w-[15%] p-0">
            <select
              name="filter"
              id="filter"
              className={`bg-[#1E1E1E] text-white text-[1.375rem] h-[100%] w-full m-0 p-4 ${styles.select}`}
            >
              <option value="All">All</option>
              <option value="Technical">Technical</option>
              <option value="Non Technical">Non Technical</option>
            </select>
          </div> */}
        </div>
        <div className="w-full m-16 flex flex-col gap-5">
          {/* <EventsList /> */}
          <EventList events={events} />
        </div>
      </div>
    </>
  );
}
