/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";


const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

export default function EventCard({ event }: { event: any }) {
  const startTime = new Date(event.start_date);
  const endTime = new Date(event.end_date);
  const startDate = startTime.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const endDate = endTime.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const startTimeString = startTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  const endTimeString = endTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  const handleEventClick = () => {
    window.location.href = `/eventDetails?eventPid=${event.pid}`;
  };
  const formattedPrize = Number(event.total_prize).toLocaleString("hi");
  const formattedPrizePerTicket = Number(event.price_per_ticket).toLocaleString(
    "hi"
  );

  return (
    <div
      key={event._id}
      className={`w-full h-[9rem] max-w-[100vw] overflow-x-hidden max-h-[50vw] md:h-[15rem] lg:h-[20rem] p-0 flex flex-row justify-center items-center text-[1.5rem] ${
        event.featured
          ? `border-[#FFD700] border-[2px]`
          : "border border-[#fff]"
      }`}
    >
      <div
        className={`h-full border-r w-auto aspect-square ${
          event.featured ? `border-[#FFD700]` : "border-[#fff]"
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
              <h1 className="text-[#fff] text-[1rem] text-left w-fit whitespace-nowrap md:w-auto md:text-[1.5rem] lg:text-[2.25rem] font-[700] font-oddval">
                {event.name}
              </h1>
              {event.total_prize && (
                <p
                  className={`text-[#080c0b] ${space_grotesk.className} inline-flex md:text-[0.8rem] lg:text-[1rem] font-[700] py-[0.5rem] px-[0.7rem] justify-center whitespace-nowrap items-center leading-[100%] bg-[#ff82fe] rounded-[4.75rem]`}
                >
                  {/* <img src="/events/trophy.svg" className="h-[1rem] mr-1 w-auto" /> - &#x20B9;{" "} */}
                  Cash Prize - &#x20B9; {formattedPrize}
                </p>
              )}
              {event.featured && (
                <p
                  className={`text-[#080c0b] ${space_grotesk.className} inline-flex md:text-[0.8rem] lg:text-[1rem] font-[700]  pr-[0.7rem] justify-center whitespace-nowrap items-center leading-[100%] bg-[#D5FD4A] rounded-[4.75rem]`}
                >
                  <img src="/events/premium_event.svg" className="h-full w-auto" />
                  Premium Event
                </p>
              )}
              {/* <sup>
                * only for external participants
              </sup> */}
            </div>
            <p
              className={` w-full text-[#93f2b1] ${space_grotesk.className}  text-[0.6875rem] md:text-[1rem] lg:text-[1.5rem] md:text-left`}
            >
              {event.club}
            </p>
          </div>
          <div className="hidden md:block md:pr-8" onClick={handleEventClick}>
            <div
            // target="_blank"
            // rel="noopener noreferrer"
            // href="https://vtop.vit.ac.in/vtop/"
            // href={`/eventDetails?eventPid=${event.pid}`}
            >
              <div
                className={`absolute pointer-cursor-element text-[#181717] text-[1.5rem] font-[700] font-oddval leading-[100%] bg-[#d5fd4a] py-[1.5rem] px-[2rem] ${space_grotesk.className}`}
              >
                More Info
              </div>
            </div>
            <div
              className={`mx-[-0.5rem] my-[0.5rem] pointer-cursor-element text-[#0d0f04] text-[1.5rem] whitespace-nowrap font-[700] border font-oddval leading-[100%] bg-[#0D0F04] py-[1.5rem] px-[2rem] ${
                space_grotesk.className
              } ${event.featured ? `border-[#FFD700]` : "border-[#fff]"}`}
            >
              More Info
            </div>
          </div>
        </div>
        <div
          className={`text-[0.7rem] md:text-[1rem] w-full lg:text-[1.25rem] overflow-hidden m-auto text-[#fff] leading-[140%] p-2 lg:pb-4 md:px-6 lg:px-10 md:py-0`}
        >
          <p
            className={`h-full text-left md:h-full w-full max-w-[85%] overflow-hidden overflow-ellipsis ${space_grotesk.className}`}
          >
            {event.description}
          </p>
        </div>
        <div
          className={`md:border-t md:min-h-[2rem] lg:min-h-[4rem] h-auto w-full p-0 flex flex-row justify-around lg:justify-center items-center ${
            event.featured ? `border-[#FFD700]` : "border-[#fff]"
          }`}
        >
          <div
            className={`hidden lg:flex border-r w-full lg:max-w-[30%] h-[2.5rem] md:h-full gap-[0.5rem] flex-row justify-center items-center ${
              event.featured ? `border-[#FFD700]` : "border-[#fff]"
            }`}
          >
            <Image
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
          <div
            className={`flex pb-2 lg:pb-0 flex-row w-auto lg:w-full lg:max-w-[20%] h-full gap-[0.5rem] justify-center items-center lg:border-r ${
              event.featured ? `border-[#FFD700]` : "border-[#fff]"
            }`}
          >
            <Image
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
          <div
            className={` ${
              event.featured ? `border-[#FFD700]` : "border-[#fff]"
            } hidden lg:flex border-r w-full lg:max-w-[30%] h-full gap-[0.5rem] flex-row justify-center items-center`}
          >
            <Image
              className="max-h-[80%] w-auto aspect-square object-fill object-center"
              src="/events/group.svg"
              alt="Group Icon"
              width={50}
              height={50}
            />
            <p
              className={`text-[1rem] md:text-[1.25rem] text-[#fff] ${space_grotesk.className}`}
            >
              {event.team_size}
            </p>
          </div>
          <div className="w-auto lg:w-full pb-2 lg:pb-0 lg:max-w-[30%] h-full gap-[0.5rem] flex flex-row justify-center items-center">
            <Image
              className="w-[0.8rem] md:w-[1.2rem] lg:w-[1.5rem] h-auto aspect-square object-fill object-center"
              src="/events/cost.svg"
              alt="Rupee Icon"
              width={50}
              height={50}
            />
            {/* <Link
            target="_blank"
              href="https://pravega.com"
              className={`text-[0.6rem] md:text-[1.25rem] text-[#fff] ${space_grotesk.className} pointer-cursor-element`}
            >
              www.pravega.com
            </Link> */}
            <p
              className={`text-[0.6rem] md:text-[1.25rem] text-[#fff] ${space_grotesk.className}`}
            >
              Rs. {formattedPrizePerTicket}/-
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
