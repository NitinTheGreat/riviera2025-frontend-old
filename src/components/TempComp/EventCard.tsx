/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Space_Grotesk } from 'next/font/google';
import Image from "next/image";
import styles from "./index.module.css"
import { Calendar, Clock, IndianRupee, UsersRound } from 'lucide-react';

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

export default function EventCard({ event }: { event: any }) {
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
      className={`w-full h-[9rem] max-w-[100vw] overflow-x-hidden max-h-[50vw] md:h-[15rem] lg:h-[20rem] p-0 flex flex-row justify-center items-center text-[1.5rem] ${
        event.featured
          ? `border-slate-300 border-[2px]`
          : "border border-slate-300"
      }`}
    >
      <div
        className={`h-full border-r w-auto aspect-square ${
          event.featured ? `border-slate-300` : "border-slate-300"
        }`}
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
      <div className="flex flex-col w-full h-full justify-center items-center">
        <div className="flex flex-row justify-between items-center p-2 pb-0 md:p-6 lg:pl-10 w-full h-auto">
          <div className=" flex flex-col justify-between w-full items-center">
            <div className="flex flex-row w-full justify-start items-center gap-4 ">
              <h1 className="text-[#fff] text-[1rem] text-left w-fit whitespace-nowrap md:w-auto md:text-[1.5rem] lg:text-[2.25rem] font-[700] font-fk-trial">
                {event.name}
              </h1>
              {event.total_prize && (
                <p
                  className={`text-[#080c0b] font-editorial inline-flex md:text-[0.8rem] lg:text-[1rem] font-[700] py-[0.5rem] px-[0.7rem] justify-center whitespace-nowrap items-center leading-[100%] bg-foreground rounded-[4.75rem]`}
                >
                  Cash Prize - &#x20B9; {formattedPrize}
                </p>
              )}
              {event.featured && (
                <p
                  className={`text-[#080c0b] font-editorial inline-flex md:text-[0.8rem] lg:text-[1rem] font-[700]  pr-[0.7rem] justify-center whitespace-nowrap items-center leading-[100%] bg-secondary rounded-[4.75rem]`}
                >
                  <img src="/events/premium_event.svg" className="h-full w-auto" />
                  Premium Event
                </p>
              )}
            </div>
            <p
              className={` w-full text-primary font-editorial  text-[0.6875rem] md:text-[1rem] lg:text-[1.5rem] md:text-left`}
            >
              {event.club}
            </p>
          </div>
          <div className="hidden md:block md:pr-8" onClick={handleEventClick}>
            <div>
              <div
                className={`w-[10rem] text-center absolute pointer-cursor-element text-primary-foreground text-[1.2rem] font-[700] font-editorial leading-[100%] bg-primary py-[1.5rem] px-[2rem] ${styles.register}`}
              >
                More Info
              </div>
            </div>
            <div
              className={`w-[10rem] mx-[-0.5rem] my-[0.5rem] pointer-cursor-element text-primary-foreground text-[1.2rem] whitespace-nowrap font-[700] border  leading-[100%] bg-background py-[1.5rem] px-[2rem] font-editorial
              } ${event.featured ? `border-slate-300` : "border-slate-300"}`}
            >
              More Info
            </div>
          </div>
        </div>
        <div
          className={`text-[0.7rem] md:text-[1rem] w-full lg:text-[1.25rem] overflow-hidden m-auto text-[#fff] leading-[140%] p-2 lg:pb-4 md:px-6 lg:px-10 md:py-0`}
        >
          <p
            className={`h-full text-left md:h-full w-full max-w-[85%] overflow-hidden overflow-ellipsis ${styles.desc} font-editorial`}
          >
            {event.description}
          </p>
        </div>
        <div
          className={`md:border-t md:min-h-[2rem] lg:min-h-[4rem] h-auto w-full p-0 flex flex-row justify-around lg:justify-center items-center ${
            event.featured ? `border-slate-300` : "border-slate-300"
          }`}
        >
          <div
            className={`hidden lg:flex border-r w-full lg:max-w-[30%] h-[2.5rem] md:h-full gap-[0.5rem] flex-row justify-center items-center ${
              event.featured ? `border-slate-300` : "border-slate-300"
            }`}
          >
            <Clock className="text-primary"/>
            <p
              className={`text-[1rem] md:text-[1.25rem] text-[#fff] font-editorial`}
            >
              {startTimeString} - {endTimeString}
            </p>
          </div>
          <div
            className={`flex pb-2 lg:pb-0 flex-row w-auto lg:w-full lg:max-w-[20%] h-full gap-[0.5rem] justify-center items-center lg:border-r ${
              event.featured ? `border-slate-300` : "border-slate-300"
            }`}
          >
            <Calendar  className="text-primary"/>
            <p
              className={`text-[0.6rem] md:text-[1.25rem] text-[#fff] font-editorial`}
            >
              {startDate}
            </p>
          </div>
          <div
            className={` ${
              event.featured ? `border-slate-300` : "border-slate-300"
            } hidden lg:flex border-r w-full lg:max-w-[30%] h-full gap-[0.5rem] flex-row justify-center items-center`}
          >
            <UsersRound className="text-primary"/>
            <p
              className={`text-[1rem] md:text-[1.25rem] text-[#fff] font-editorial`}
            >
              {event.team_size || "TBA"}
            </p>
          </div>
          <div className="w-auto lg:w-full pb-2 lg:pb-0 lg:max-w-[30%] h-full gap-[0.5rem] flex flex-row justify-center items-center">
            <IndianRupee className="text-primary"/>
            <p
              className={`text-[0.6rem] md:text-[1.25rem] text-[#fff] font-editorial`}
            >
              Rs. {formattedPrizePerTicket}/-
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

