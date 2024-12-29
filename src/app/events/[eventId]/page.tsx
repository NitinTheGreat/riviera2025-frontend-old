/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import react from "react";
import { useEffect, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import axios from "axios";
import dotenv from "dotenv";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import CloudsAndBalloon from "@/components/CloudsAndBalloon";
import Link from "next/link";
import styles from "@/styles/index.module.css";
import { VectorIcon } from "@/components/VectorIcon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

type slots = {
  end_date: string;
  start_date: string;
  venue: string;
};

interface EventDetail {
  category: string;
  club: string;
  description: string;
  featured: boolean;
  image: string;
  judgement_criteria: string;
  name: string;
  number_of_participants: string;
  pid: string;
  points: string;
  price_per_ticket: number;
  prizes: string;
  slot_details: slots[];
  rules: string;
  short_description: string;
  is_a_team_event: boolean;
  event_type: string;
}

export default function EventDetails() {
  const searchParams = useSearchParams();

  const eventPid = searchParams.get("eventPid");

  // async function generateMetadate(): Promise<Metadata> {
  //   const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  //   const response = await axios.get(`${baseURL}events/${eventPid}`);
  //   const event: EventDetail = response.data;
  //   return {
  //     title: `Riviera '24 | ${event.name}`,
  //     description: event.short_description,
  //     openGraph: {
  //       images: [{ url: event.image, width: 1200, height: 630 }],
  //     },
  //   };
  // }

  dotenv.config();
  const [width, setWidth] = useState("100%");
  const [events, setEvents] = useState<EventDetail>();

  useEffect(() => {
    if (eventPid !== null) getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventPid]);

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const getEvents = async () => {
    try {
      const response = await axios.get(`${baseURL}events/${eventPid}`);
      const event: EventDetail = response.data;
      setEvents(event);
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

  const itemClass = {
    title:
      "w-full whitespace-wrap leading-[120%] my-4 text-left pr-[3rem] md:pr-[5rem]",
    indicator: "absolute right-[4rem] md:right-[6rem] clickable",
    base: "flex flex-row justify-between w-full",
    button: "w-full",
    heading: "w-full",
    trigger: "",
    titleWrapper: "w-full",
    subtitle: "",
    startContent: "",
    content: "bg-[#ffffff0d] rounded-lg mr-[3rem] p-[1rem] mb-[2rem]",
  };

  const startTime = new Date(events?.slot_details[0].start_date || "");
  const startDate = startTime.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
  });
  const endTime = new Date(events?.slot_details[0].end_date || "");
  const startTimeString = startTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  const endTimeString = endTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  const prizeAmount = Number(events?.prizes);
  const formattedPrize = prizeAmount?.toLocaleString("hi");

  const perTicket = Number(events?.price_per_ticket);
  const formattedPerTicket = perTicket?.toLocaleString("hi");

  return (
    <div className="h-auto flex flex-col bg-[#111]">
      <Head>
        <title>Riviera &apos;24 | {events?.name}</title>
        <meta property="og:title" content={events?.name} />
        <meta property="og:description" content={events?.short_description} />
        <meta property="og:image" content={events?.image} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200px" />
        <meta property="og:image:height" content="630px" />
        {/* <meta property="og:url" content={} /> */}
      </Head>
      <div className="flex flex-col mt-[7rem] w-full px-4">
        <nav className="flex flex-row justify-between items-center w-full md:px-[4rem] bg-[#111] text-[#FFF]">
          {/*Home > Events > Internal Event > Kalaa*/}
          <div className="flex flex-row gap-3 justify-start items-center">
            <Link href="/" className="pointer-cursor-element">
              Home
            </Link>
            &gt;
            <Link
              href={
                events?.event_type == "internal"
                  ? "/internalEvents"
                  : "/externalEvents"
              }
              className="pointer-cursor-element"
            >
              {events?.event_type == "internal"
                ? "Internal Events"
                : "External Events"}
            </Link>
            &gt;
            <Link
              href={`/eventDetails?eventPid=${eventPid}`}
              className="pointer-cursor-element"
            >
              {events?.name}
            </Link>
          </div>
        </nav>
        <div className="flex flex-col md:flex-row gap-[3rem] items-center justify-center w-full h-auto bg-[#111] md:px-[4rem] mb-6">
          <div className="flex relative flex-col md:w-[25%] md:min-w-[27rem] self-start">
            <img
              className="absolute z-10 right-4 top-8 pointer-cursor-element active:cursor-none"
              src="/events/share.svg"
              alt="Share Icon"
              width={40}
              height={40}
              onClick={(e) => {
                navigator.clipboard.writeText(window.location.href);
                toast("Link Copied", {
                  progressClassName: "bg-red-500",
                });
              }}
            />
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              draggable
              pauseOnHover
              theme="dark"
              progressClassName="bg-red-500 text-red-500"
            />
            <img
              src={events?.image}
              alt="event image"
              width={500}
              height={500}
              className="border-2 border-white aspect-square self-start mt-4 md:w-[25%] md:min-w-[27rem]"
            />
            {events?.event_type !== "internal" && (
              <p className="w-full text-center text-[1.25rem] p-4">
                *Only for external participants
              </p>
            )}
          </div>
          <div className="flex flex-col w-full h-full justify-start items-start md:items-center">
            <div className="flex w-full flex-col md:flex-row justify-start items-center md:justify-between md:items-center">
              <div className="w-full flex flex-col justify-start">
                <h1 className="text-[2.5rem] lg:text-[3rem] font-bold font-oddval lg:line-clamp-1 lg:whitespace-nowrap">
                  {events?.name}{" "}
                </h1>
                <h2
                  className={`text-[1.5rem] ${space_grotesk.className} text-[#93F2B1]`}
                >
                  {events?.club}
                </h2>
              </div>
            </div>
            <hr className="w-full border-[#FFFFFF3F] my-[0.5rem]" />
            <div className="w-full mt-2 md:mt-0 flex flex-col justify-start">
              <p
                className={`text-[2rem] font-[700] justify-start items-center inline-flex w-full ${space_grotesk.className}`}
              >
                &#x20B9; {formattedPerTicket}{" "}
                <span
                  className={`text-left text-[1rem] ml-2 text-[#93F2B1] ${space_grotesk.className}`}
                >
                  {events?.is_a_team_event ? "(per team)" : "(per person)"}
                </span>
              </p>
              <sub className="text-[#D5FD4A] text-[1rem] font-[400] leading-[100%] mb-8">
                +18% GST
              </sub>
              <div className="flex md:hidden justify-start items-center py-4 gap-4">
                <img
                  className="w-[1.5rem] h-auto aspect-square object-fill object-center"
                  src="/events/calender.svg"
                  alt="Calendar Icon"
                  width={50}
                  height={50}
                />
                <p
                  className={`text-[1.25rem] text-[#fff] ${space_grotesk.className}`}
                >
                  {startDate}
                  {/* - {endDate} */}
                </p>
              </div>
              <div className="flex md:hidden justify-start items-center py-4 w-[20] gap-4">
                <img
                  className="w-[1.5rem] h-[1.5rem] object-fill object-center"
                  src="/events/clock.svg"
                  alt="Medal Icon"
                  width={50}
                  height={50}
                />
                <p
                  className={`text-[1.25rem] text-[#fff] ${space_grotesk.className}`}
                >
                  {startTimeString} - {endTimeString}
                </p>
              </div>
            </div>
            <p
              className={`text-[1.25rem] text-left w-full leading-normal whitespace-pre-line ${space_grotesk.className}`}
            >
              {events?.short_description}
            </p>
            <p
              className={`text-[1.25rem] my-4 text leading-normal whitespace-pre-line ${space_grotesk.className}`}
            >
              {events?.description}
            </p>
            <div
              className={`grid-cols-2 grid self-start gap-4 mt-4 ${space_grotesk.className}`}
            >
              <div className="flex flex-col">
                <h1
                  className={`text-[1.5rem] font-[700] ${space_grotesk.className} text-[#D5FD4A]`}
                >
                  VENUE
                </h1>
                <p className="text-[1rem] font-[500]">
                  {events?.slot_details[0]?.venue}
                </p>
              </div>
              <div
                className={`${
                  events?.number_of_participants === undefined
                    ? "hidden"
                    : "flex"
                } flex-col`}
              >
                <h1
                  className={`text-[1.5rem] font-[700] ${space_grotesk.className} text-[#D5FD4A]`}
                >
                  NO OF PARTICIPANTS
                </h1>
                <p className="text-[1rem] font-[500]">
                  {events?.number_of_participants}
                </p>
              </div>
              <div
                className={`${
                  events?.prizes === undefined ? "hidden" : "flex"
                } flex-col h-fit`}
              >
                <h1
                  className={`text-[1.5rem] font-[700] ${space_grotesk.className} text-[#D5FD4A] `}
                >
                  PRIZE POOL
                </h1>
                <p className="text-[1rem] font-[500]">
                  &#x20B9; {formattedPrize}
                </p>
              </div>
              <div
                className={`flex-col ${
                  events?.points === undefined ? "hidden" : "flex"
                } flex-col `}
              >
                <h1
                  className={`text-[1.5rem] font-[700] flex gap-3 items-start ${space_grotesk.className} text-[#D5FD4A]`}
                >
                  POINTS{" "}
                  <div className={`${styles.tooltip} flex flex-row gap-4`}>
                    <img
                      className={`h-[1.5rem] pointer-cursor-element`}
                      src="/help.svg"
                    />
                    <p
                      className={`${styles.tooltiptext} absolute lg:ml-8 mr-4 text-[#fff] max-w-[400px] text-[1rem] bg-[#1F1F1F] rounded-lg px-4 py-2 z-[10]`}
                    >
                      Each fest event awards points. Winners add those points to
                      their college&apos;s total. Most points wins the coveted
                      rolling trophy.
                    </p>
                  </div>
                </h1>
                <p className="text-[1rem] font-[500]">{events?.points}</p>
              </div>
            </div>
            <div
              className={`${
                events?.slot_details === undefined ? "hidden" : "flex"
              } flex-col w-full text-left`}
            >
              <h1
                className={`text-[1.5rem] font-[700] ${space_grotesk.className} text-[#D5FD4A] `}
              >
                SLOTS
              </h1>
              <div className="flex flex-wrap gap-2">
                {events?.slot_details.map((slot, index) => {
                  const startTime = new Date(slot.start_date);
                  const endTime = new Date(slot.end_date);
                  const startDate = startTime.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  });
                  const startTimeString = startTime.toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "numeric",
                    }
                  );
                  const endTimeString = endTime.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  });
                  return (
                    <div
                      key={index}
                      className={`${space_grotesk.className} text-4 font-[500] border border-[#fff] p-2 w-fit`}
                    >
                      <p className="">{`${slot.venue} | ${startTimeString} - ${endTimeString} | ${startDate}`}</p>
                    </div>
                  );
                })}
              </div>

              {/* <table className="text-[1rem]">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Venue</th>
                  </tr>
                </thead>
                <tbody>
                  {events?.slot_details.map((slot, index) => {
                    const startTime = new Date(slot.start_date);
                    const endTime = new Date(slot.end_date);
                    const startDate = startTime.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    });
                    const startTimeString = startTime.toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "numeric",
                      }
                    );
                    const endTimeString = endTime.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    });
                    return (
                      <tr key={index} className="border">
                        <td className="px-2 p-1">{startDate}</td>
                        <td className="px-2 p-1">
                          {startTimeString} - {endTimeString}
                        </td>
                        <td className="px-2 p-1">{slot.venue}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table> */}
            </div>
          </div>
        </div>
        {(events?.judgement_criteria !== undefined ||
          events?.rules !== undefined ||
          events?.points !== undefined) && (
          <>
            {/* <hr className="w-auto border-[#949999] border my-[1.5rem] mx-[4rem]" /> */}
            <div className={` ${space_grotesk.className} px-[4rem]`}>
              <Accordion
                variant="light"
                selectionMode="single"
                itemClasses={itemClass}
                showDivider={true}
                disableIndicatorAnimation={false}
                className="w-full text-[1.25rem] cursor-none text-[#93F2B1] flex flex-col justify-between mb-4"
                motionProps={{
                  variants: {
                    enter: {
                      y: 0,
                      opacity: 1,
                      height: "auto",
                      transition: {
                        height: {
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                          duration: 1,
                        },
                        opacity: {
                          easings: "ease",
                          duration: 1,
                        },
                      },
                    },
                    exit: {
                      y: -10,
                      opacity: 0,
                      height: 0,
                      transition: {
                        height: {
                          easings: "ease",
                          duration: 0.25,
                        },
                        opacity: {
                          easings: "ease",
                          duration: 0.3,
                        },
                      },
                    },
                  },
                }}
              >
                <AccordionItem
                  key="1"
                  disableIndicatorAnimation={false}
                  indicator={<VectorIcon />}
                  // indicator="start"
                  title="Judgement Criteria"
                  className={`${
                    events?.judgement_criteria === undefined ? "hidden" : "flex"
                  } text-[1.25rem] text-[#93F2B1] leading-[4rem] m-auto w-full flex-col justify-between focus:outline-none`}
                >
                  <p className="text-[1.25rem] text-[#BCBCBC] leading-normal whitespace-pre-line">
                    {events?.judgement_criteria}
                  </p>
                </AccordionItem>
                <AccordionItem
                  key="2"
                  disableIndicatorAnimation={false}
                  // indicator="start"
                  indicator={<VectorIcon />}
                  title="Rules And Regulations"
                  className={`${
                    events?.rules === undefined ? "hidden" : "flex"
                  } text-[1.25rem] text-[#93F2B1] leading-[4rem] m-auto w-full flex-col justify-between focus:outline-none`}
                >
                  <p className="text-[1.25rem] text-[#BCBCBC] leading-normal whitespace-pre-line">
                    {events?.rules}
                  </p>
                </AccordionItem>
                <AccordionItem
                  key="3"
                  disableIndicatorAnimation={false}
                  // indicator="start"
                  indicator={<VectorIcon />}
                  title="Points"
                  className={`text-[1.25rem] text-[#93F2B1] leading-[4rem] m-auto w-full flex-col justify-between ${
                    events?.points === undefined ? "hidden" : "flex"
                  }`}
                >
                  <p className="text-[1.25rem] text-[#BCBCBC] leading-normal">
                    {events?.points}
                  </p>
                </AccordionItem>
              </Accordion>
            </div>
            {/* <hr className="w-auto border-[#949999] border mx-[4rem]" /> */}
          </>
        )}
      </div>
      <CloudsAndBalloon />
      <div
        className={`fixed top-[85vh] w-full px-[4rem] h-[4rem] z-[999] ${space_grotesk.className}`}
      >
        <div className="h-full w-full flex flex-row border bg-[#111] border-[#fff]">
          <div className="hidden md:flex flex-col justify-evenly items-center pl-4 w-[25%] border-r border-[#fff]">
            <h1 className="font-oddval text-left w-full text-[1.5rem] font-[700] leading-[100%] line-clamp-1">
              {events?.name}
            </h1>
            <p className=" text-left w-full text-[#93F2B1] line-clamp-1 leading-[100%]">
              {events?.club}
            </p>
          </div>
          <div className="hidden md:flex justify-center items-center p-4 gap-4 border-r w-[15%]">
            <img
              className="w-[0.8rem] md:w-[1.2rem] lg:w-[1.5rem] h-auto aspect-square object-fill object-center"
              src="/events/calender.svg"
              alt="Calendar Icon"
              width={50}
              height={50}
            />
            <p
              className={`text-[0.6rem] md:text-[1.25rem] text-[#fff] ${space_grotesk.className}`}
            >
              {startDate}
              {/* - {endDate} */}
            </p>
          </div>
          <div className="hidden md:flex justify-center items-center p-4 w-[20%] border-r gap-4">
            <img
              className="w-[1.5rem] h-[1.5rem] object-fill object-center"
              src="/events/clock.svg"
              alt="Medal Icon"
              width={50}
              height={50}
            />
            <p
              className={`text-[1rem] md:text-[1.25rem] text-[#fff] ${space_grotesk.className}`}
            >
              {startTimeString} - {endTimeString}
            </p>
          </div>
          <div className="flex justify-center items-align p-1 md:p-4 w-[50%] md:w-[20%] gap-4 border-r">
            <img
              className="w-[1rem] md:w-[1.5rem] h-auto aspect-square object-fill object-center"
              src="/events/cost.svg"
              alt="Rupee Icon"
              width={50}
              height={50}
            />
            <p
              className={`text-[1rem] md:text-[1.25rem] text-[#fff] self-center ${space_grotesk.className}`}
            >
              Rs. {formattedPerTicket}/-
            </p>
          </div>
          <Link
            className="bg-[#D5FD4A] w-[50%] md:w-[20%] flex justify-center items-center p-2 md:p-4 pointer-cursor-element"
            href={`${
              events?.event_type === "internal"
                ? "https://web.vit.ac.in/rivierainternal"
                : "https://web.vit.ac.in/riviera"
            }`}
          >
            <p
              className={`text-[1rem] md:text-[1.25rem] font-[700] text-[#111] ${space_grotesk.className}`}
            >
              REGISTER &gt;
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
