/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Space_Grotesk } from 'next/font/google';
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css"
import { Calendar, IndianRupee } from 'lucide-react';

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

export default function MobileEventCard({ event }: { event: any }) {
  const startTime = event.start_date ? new Date(event.start_date) : null;
  const endTime = event.end_date ? new Date(event.end_date) : null;
  const startDate = startTime
    ? startTime.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    : "TBA";
  const endDate = endTime
    ? endTime.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    : "TBA";
  const startTimeString = startTime
    ? startTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })
    : "TBA";
  const endTimeString = endTime
    ? endTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })
    : "TBA";

  const handleEventClick = () => {
    window.location.href = `/events/${event.pid}`;
  };
  const formattedPrize = event.total_prize
    ? Number(event.total_prize).toLocaleString("hi")
    : "TBA";
  const formattedPrizePerTicket = event.price_per_ticket
    ? Number(event.price_per_ticket).toLocaleString("hi")
    : "TBA";

  return (
    <div
      key={event._id}
      className={`w-full h-[9rem] max-h-[50vw] md:h-[15rem] lg:h-[20rem] p-0 border ${
        event.featured ? "border-foreground" : "border-[#fff]"
      } flex flex-row justify-center items-center text-[1.5rem]`}
    >
      <div
        className={`h-full border-r w-auto aspect-square ${event.featured ? "border-foreground" :"border-[#fff]"}`}
        id="Event Image"
      >
        <Image
          className="h-full w-auto aspect-square object-fill object-center "
          src={event.image}
          alt="Event Image"
          width={500}
          height={500}
        />
      </div>
      <div
        className="flex flex-col w-full h-full justify-center items-center"
        onClick={handleEventClick}
      >
        <div className="flex flex-row justify-between items-center p-2 pb-0 md:p-6 lg:pl-10 w-full h-auto">
          <div className=" flex flex-col justify-between w-full items-center">
            <div className="flex flex-row w-full justify-between items-center gap-4 ">
              <div className="flex flex-col mb-2">
                <h1 className="text-[#fff] text-[1rem] text-left w-full font-[700] font-fk-trial line-clamp-1 md:line-clamp-none">
                  {event.name}
                </h1>
              </div>
              <div className="rotate-[270deg] max-h-[0.5rem] ">
                <img src="/events/vector.svg" className="max-h-[0.6rem]" />
              </div>
            </div>

            <div className="w-full flex flex-row justify-between items-center">
              <p
                className={` w-full text-primary font-editorial  text-[0.75rem] `}
              >
                {event.club}
              </p>
              {event.total_prize && (
                <p
                  className={`text-[#080c0b] font-editorial inline-flex text-[0.75rem] font-[700] py-[0.3rem] px-[0.7rem] justify-center whitespace-nowrap items-center leading-[100%] bg-foreground rounded-[4.75rem]`}
                >
                  <img
                    src="/events/trophy.svg"
                    className="h-[0.75rem] mr-1 w-auto"
                  />{" "}
                  &#x20B9;
                  {formattedPrize}
                </p>
              )}
            </div>
          </div>
        </div>
        <div
          className={`text-[0.7rem] md:text-[1rem] w-full lg:text-[1.25rem] h-max m-auto text-[#fff] leading-[140%] p-2 lg:pb-4 md:px-6 lg:px-10 md:py-0`}
        >
          <p
            className={`h-full text-left md:h-full w-full  overflow-ellipsis ${styles.desc} font-editorial`}
          >
            {event.description}
          </p>
        </div>
        <div className={`border-t ${event.featured ? "border-foreground" : "border-[#fff]"} md:min-h-[2rem] lg:min-h-[4rem] h-auto w-full p-0 flex flex-row justify-around lg:justify-center items-center`}>
          <div className="hidden lg:flex border-r w-full lg:max-w-[30%] h-[2.5rem] md:h-full border-[#fff] gap-[0.5rem] flex-row justify-center items-center">
            <Image
              className="w-[1.5rem] h-[1.5rem] object-fill object-center"
              src="/events/clock.svg"
              alt="Medal Icon"
              width={50}
              height={50}
            />
            <p
              className={`text-[1rem] md:text-[1.25rem] text-[#fff] font-editorial`}
            >
              {startTimeString} - {endTimeString}
            </p>
          </div>
          <div className={`flex flex-row w-full py-1 lg:max-w-[20%] h-full gap-[0.5rem] justify-center items-center border-r ${event.featured ? "border-foreground" :"border-[#fff]}"}`}>
          <Calendar  className="text-primary size-4"/>

            <p
              className={`text-[0.6rem] md:text-[1.25rem] text-center text-[#fff] font-editorial mt-1`}
            >
              {startDate}
            </p>
          </div>
          <div className="hidden lg:flex border-r w-full lg:max-w-[30%] h-full border-[#fff] gap-[0.5rem] flex-row justify-center items-center">
            <Calendar  className="text-primary w-[1 rem]"/>
            <p
              className={`text-[1rem] md:text-[1.25rem] text-[#fff] font-editorial`}
            >
              {event.team_size || "TBA"}
            </p>
          </div>
          <div className="w-full lg:max-w-[30%] h-full gap-[0.5rem] flex flex-row justify-center items-center">
            
            <IndianRupee className="text-primary size-4"/>

            <p
              className={`text-[0.6rem]  md:text-[1.25rem] text-[#fff] font-editorial`}
            >
              Rs. {formattedPrizePerTicket}/-
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

