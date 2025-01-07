// New with loading skeleton
"use client";
import { useState, useEffect } from "react";
import { EventDetail } from "@/types";
import Image from "next/image";
import { Calendar, Clock, IndianRupee } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordian";
import Link from "next/link";
import SlotCard from "@/components/SlotCard";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import Loading from "./loading";

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Page() {
  const params = useParams();
  const slug = params.eventId;
  const [data, setData] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const eventData = {
          category: "external",
          club: "Anchoring Club",
          description:
            "Join the exciting world of AdZap 2025, where creativity knows no limits! This fun-filled competition challenges participants to use humor, catchy jingles, and engaging stories to transform the art of advertising.",
          featured: false,
          image: "https://i.imgur.com/8tCPoSy.png",
          judgement_criteria:
            "Participants will be judged on basis of their creativity, originality, humour, clarity, and content.",
          name: "AdZap 2025",
          number_of_participants: "3 - 5 Members",
          pid: "external_misc",
          points: "",
          price_per_ticket: 0,
          prizes: "",
          slot_details: [],
          rules:
            "1. Time Limit: Each team will get 2-3 minutes to present their advertisement. 2. Exceeding the time limit will result in negative marking. 3. Content Guidelines: Advertisements must be original and not copied from any existing sources. The content should be appropriate for all audiences (no use of offensive language, sensitive topics, or indecent visuals). 4. Advertisements should be delivered in English or Hindi. 5. Props and Visual Aids: Teams are allowed to use handmade props or placards during their performance. No pre-recorded audio or video presentations are permitted. 6. Teams must avoid excessive use of slogans or mimicking existing ads. 7. Disqualification Criteria: Plagiarism or inappropriate content will lead to immediate disqualification. Failure to follow the rules or disrespecting event coordinators will also lead to disqualification. 8. Teams must register by the deadline. Late entries will not be entertained. Only the team leader should register on behalf of the team.",
          short_description:
            "Join the exciting world of AdZap 2025, where creativity knows no limits! This fun-filled competition challenges participants to use humor, catchy jingles, and engaging stories to transform the art of advertising.",
          is_a_team_event: true,
          event_type: "Informal",
        };
        setData(eventData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  //       console.log("base Url : " + baseurl);
  //       const response = await fetch(`${baseurl}/events/${slug}`);
  //       if (!response.ok) {
  //         toast.error("Failed to fetch event data");
  //         console.error("Error fetching data:", response.body);
  //         return;
  //       }
  //       const eventData = await response.json();
  //       setData(eventData);
  //     } catch (error) {
  //       toast.error("Failed to fetch event data");
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, [slug]);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <div className="p-8">Error loading event data.</div>;
  }

  // Calculate time and date for the first slot (used in the footer)
  const firstSlot = data.slot_details[0];
  const firstStartTime = new Date(firstSlot?.start_date);
  const firstEndTime = new Date(firstSlot?.end_date);
  const firstStartDate = firstStartTime.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
  const firstStartTimeString = firstStartTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  const firstEndTimeString = firstEndTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="flex flex-col mt-24">
      <div className="flex flex-col sm:flex-row sm:justify-start sm:gap-12 gap-2">
        <div className="flex flex-col items-start gap-2 h-auto sm:min-w-[25rem] relative">
          <Image
            src={data.image}
            alt="Event Poster"
            width={1000}
            height={1000}
            layout="responsive"
            className="max-w-[25rem] border-foreground border-2"
          />
          {data.category === "external" && (
            <h1 className="font-editorial text-center">
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
          <div className="grid sm:grid-cols-4 grid-cols-2 ">
            <div className="flex flex-col sm:col-span-3">
              <h3 className="font-fk-trial text-2xl font-bold text-primary">
                TOTAL PARTICIPANTS
              </h3>
              <h3 className="font-editorial">{data.number_of_participants}</h3>
            </div>
          </div>
          <Accordion type="single">
            <AccordionItem value="rules">
              <AccordionTrigger className="font-fk-trial text-2xl font-bold text-primary">
                Rules
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm font-editorial">{data.rules}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="judgement">
              <AccordionTrigger className="font-fk-trial text-2xl font-bold text-primary">
                Judgement Criteria
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm font-editorial">
                  {data.judgement_criteria}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="fixed bottom-[7vh] left-0 w-full h-16 z-50 font-editorial">
        <div className="h-full w-full  max-w-[70vw] md:max-w-[90%] mx-auto flex flex-row border-2 border-foreground bg-background ">
          <div className="hidden md:flex flex-col justify-center items-start pl-4 w-1/4 border-r-2 border-foreground">
            <h1 className="font-bold text-lg text-foreground truncate">
              {data?.name}
            </h1>
            <p className="text-sm text-primary truncate">{data?.club}</p>
          </div>

          <div className="hidden md:flex items-center justify-center w-1/5 border-r-2 border-foreground gap-2">
            <Calendar className="text-primary" size={20} />
            <p className="text-foreground leading-none">TBD</p>
          </div>

          <div className="hidden md:flex items-center justify-center w-1/5 border-r-2 border-foreground gap-2">
            <Clock className="text-primary" size={20} />
            <p className="text-foreground">
              TBD
            </p>
          </div>

          <div className="flex items-center justify-center w-1/2 md:w-1/5 border-r-2 border-foreground gap-2">
            <IndianRupee className="text-primary" size={20} />
            <p className="text-foreground">
              {numberWithCommas(data.price_per_ticket)}/-
            </p>
          </div>

          <Link
            href={`${
              data?.event_type === "internal"
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
  );
}

// Old without loading skeleton
// "use client";
// import { useState, useEffect } from "react";
// import { EventDetail } from "@/types";
// import Image from "next/image";
// import { Calendar, Clock, IndianRupee } from "lucide-react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordian";
// import Link from "next/link";
// import SlotCard from "@/components/SlotCard";
// import { toast } from "sonner";
// import { useParams } from "next/navigation";

// function numberWithCommas(x: number) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// export default function Page() {
//   const params = useParams();
//   const slug = params.eventId;
//   const [data, setData] = useState<EventDetail | null>(
//     {
//       category: "external",
//       club: "Anchoring Club",
//       description:
//         "Join the exciting world of AdZap 2025, where creativity knows no limits! This fun-filled competition challenges participants to use humor, catchy jingles, and engaging stories to transform the art of advertising.",
//       featured: false,
//       image: "https://i.imgur.com/8tCPoSy.png",
//       judgement_criteria:
//         "Participants will be judged on basis of their creativity, originality, humour, clarity, and content.",
//       name: "AdZap 2025",
//       number_of_participants: "3 - 5 Members",
//       pid: "external_misc",
//       points: "",
//       price_per_ticket: 0,
//       prizes: "",
//       slot_details: [],
//       rules:
//         "1. Time Limit: Each team will get 2-3 minutes to present their advertisement. 2. Exceeding the time limit will result in negative marking. 3. Content Guidelines: Advertisements must be original and not copied from any existing sources. The content should be appropriate for all audiences (no use of offensive language, sensitive topics, or indecent visuals). 4. Advertisements should be delivered in English or Hindi. 5. Props and Visual Aids: Teams are allowed to use handmade props or placards during their performance. No pre-recorded audio or video presentations are permitted. 6. Teams must avoid excessive use of slogans or mimicking existing ads. 7. Disqualification Criteria: Plagiarism or inappropriate content will lead to immediate disqualification. Failure to follow the rules or disrespecting event coordinators will also lead to disqualification. 8. Teams must register by the deadline. Late entries will not be entertained. Only the team leader should register on behalf of the team.",
//       short_description:
//         "Join the exciting world of AdZap 2025, where creativity knows no limits! This fun-filled competition challenges participants to use humor, catchy jingles, and engaging stories to transform the art of advertising.",
//       is_a_team_event: true,
//       event_type: "Informal",
//     }
//   );

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
//   //       console.log("base Url : " + baseurl);
//   //       const response = await fetch(`${baseurl}/events/${slug}`);
//   //       if (!response.ok) {
//   //         toast.error("Failed to fetch event data");
//   //         console.error("Error fetching data:", response.body);
//   //         return;
//   //       }
//   //       const eventData = await response.json();
//   //       setData(eventData);
//   //     } catch (error) {
//   //       toast.error("Failed to fetch event data");
//   //       console.error("Error fetching data:", error);
//   //     }
//   //   };
//   //   fetchData();
//   // }, [slug]);

//   if (!data) {
//     return <div className="p-8">Loading...</div>;
//   }

//   // Calculate time and date for the first slot (used in the footer)
//   const firstSlot = data.slot_details[0];
//   const firstStartTime = new Date(firstSlot?.start_date);
//   const firstEndTime = new Date(firstSlot?.end_date);
//   const firstStartDate = firstStartTime.toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//   });
//   const firstStartTimeString = firstStartTime.toLocaleTimeString("en-US", {
//     hour: "numeric",
//     minute: "numeric",
//   });
//   const firstEndTimeString = firstEndTime.toLocaleTimeString("en-US", {
//     hour: "numeric",
//     minute: "numeric",
//   });

//   return (
//     <div className="flex flex-col mt-24">
//       <div className="flex flex-col sm:flex-row sm:justify-start sm:gap-12 gap-2">
//         <div className="flex flex-col items-start gap-2 h-auto sm:min-w-[25rem] relative">
//           <Image
//             src={data.image}
//             alt="Event Poster"
//             width={1000}
//             height={1000}
//             layout="responsive"
//             className="max-w-[25rem] border-foreground border-2"
//           />
//           {data.category === "external" && (
//             <h1 className="font-editorial text-center">
//               *Only for external participants
//             </h1>
//           )}
//         </div>
//         <div className="w-full">
//           <h1 className="font-fk-trial text-5xl font-extrabold">{data.name}</h1>
//           <h2 className="font-fk-trial text-xl font-extrabold text-primary">
//             {data.club}
//           </h2>
//           <hr className="mt-5" />
//           <div className="flex items-center mt-2">
//             <IndianRupee />
//             <h3 className="text-2xl font-editorial ">{` ${numberWithCommas(
//               data.price_per_ticket
//             )} `}</h3>
//             <span className="text-primary ml-2">
//               {data.is_a_team_event ? "(per team)" : "(per person)"}
//             </span>
//           </div>
//           <h3 className="text-primary text-2xl font-editorial">+18% GST</h3>
//           <p className="my-3 font-editorial">{data.short_description}</p>
//           <p className="my-3 font-editorial">{data.description}</p>
//           <div className="grid sm:grid-cols-4 grid-cols-2 ">
//             {/* <div className="flex flex-col">
//               <h3 className="font-fk-trial text-2xl font-bold text-primary">
//                 VENUE
//               </h3>
//               <h3 className="font-editorial">None</h3>
//             </div> */}
//             <div className="flex flex-col sm:col-span-3">
//               <h3 className="font-fk-trial text-2xl font-bold text-primary">
//                 TOTAL PARTICIPANTS
//               </h3>
//               <h3 className="font-editorial">{data.number_of_participants}</h3>
//             </div>
//             {/* {data.prizes && (
//               <div className="flex flex-col">
//                 <h3 className="font-fk-trial text-2xl font-bold text-primary">
//                   PRIZE POOL
//                 </h3>
//                 <div className="flex items-center font-editorial">
//                   <IndianRupee />
//                   {` ${numberWithCommas(Number(data.prizes))} `}
//                 </div>
//               </div>
//             )} */}
//             {/* {data.points && (
//               <div className="flex flex-col">
//                 <h3 className="font-fk-trial text-2xl font-bold text-primary">
//                   POINTS
//                 </h3>
//                 <h3 className="font-editorial">{data.points || "None"}</h3>
//               </div>
//             )} */}
//           </div>
//           {/* <h1 className="font-fk-trial text-2xl font-bold text-primary my-3">
//             Slots
//           </h1>
//           <div className="grid grid-cols-2">
//             {data.slot_details.map((slot, index) => {
//               const startTime = new Date(slot.start_date);
//               const endTime = new Date(slot.end_date);
//               const startDate = startTime.toLocaleDateString("en-IN", {
//                 day: "numeric",
//                 month: "short",
//               });
//               const startTimeString = startTime.toLocaleTimeString("en-US", {
//                 hour: "numeric",
//                 minute: "numeric",
//               });
//               const endTimeString = endTime.toLocaleTimeString("en-US", {
//                 hour: "numeric",
//                 minute: "numeric",
//               });

//               return (
//                 <SlotCard
//                   key={index}
//                   venue={slot.venue}
//                   startDate={startDate}
//                   startTimeString={startTimeString}
//                   endTimeString={endTimeString}
//                 />
//               );
//             })}
//           </div> */}
//         </div>
//       </div>
//       {/* <div className="mt-5">
//         <Accordion type="single" collapsible>
//           <AccordionItem value="item-1">
//             <AccordionTrigger>Is it accessible?</AccordionTrigger>
//             <AccordionContent>
//               Yes. It adheres to the WAI-ARIA design pattern.
//             </AccordionContent>
//           </AccordionItem>
//         </Accordion>
//       </div> */}
//       {/* <div className="fixed bottom-[5vh] left-0 w-full h-16 z-50 font-editorial bg-background flex justify-center items-center ">
//         <div className="h-full w-full max-w-7xl flex flex-row justify-center border-2 border-foreground ">
//           <div className="hidden md:flex flex-col justify-center items-start pl-4 w-1/4 h-full border-r-2 border-foreground">
//             <h1 className="font-bold text-lg text-foreground truncate">
//               {data.name}
//             </h1>
//             <p className="text-sm text-primary truncate">{data.club}</p>
//           </div>

//           <div className="hidden md:flex items-center justify-center w-1/5  h-full border-r-2 border-foreground gap-2">
//             <Calendar className="text-primary mr-2" />
//             <p className="text-foreground">{firstStartDate}</p>
//           </div>

//           <div className="hidden md:flex items-center justify-center w-1/5 h-full border-r-2 border-foreground gap-2">
//             <Clock className="text-primary mr-2" />
//             <p className="text-foreground">
//               {firstStartTimeString} - {firstEndTimeString}
//             </p>
//           </div>

//           <div className="flex items-center justify-center w-1/4 md:w-1/5 h-full border-r-2 border-foreground gap-2">
//             <IndianRupee className="text-primary" />
//             <p className="text-foreground">
//               {numberWithCommas(data.price_per_ticket)}/-
//             </p>
//           </div>

//           <Link
//             href={`${
//               data.event_type === "internal"
//                 ? "https://web.vit.ac.in/rivierainternal"
//                 : "https://web.vit.ac.in/riviera"
//             }`}
//             className="flex items-center justify-center w-1/4 md:w-1/5 bg-primary h-full  text-primary-foreground font-bold text-sm hover:opacity-90"
//           >
//             REGISTER &gt;
//           </Link>
//         </div>
//       </div> */}
//       <div className="fixed bottom-[7vh] left-0 w-full h-16 z-50 font-editorial">
//         <div className="h-full w-full  max-w-[70vw] md:max-w-[90%] mx-auto flex flex-row border-2 border-foreground bg-background ">
//           <div className="hidden md:flex flex-col justify-center items-start pl-4 w-1/4 border-r-2 border-foreground">
//             <h1 className="font-bold text-lg text-foreground truncate">
//               {data?.name}
//             </h1>
//             <p className="text-sm text-primary truncate">{data?.club}</p>
//           </div>

//           <div className="hidden md:flex items-center justify-center w-1/5 border-r-2 border-foreground gap-2">
//             <Calendar className="text-primary" size={20} />
//             {/* <p className="text-foreground leading-none">{firstStartDate}</p> */}
//             <p className="text-foreground leading-none">TBD</p>

//           </div>

//           <div className="hidden md:flex items-center justify-center w-1/5 border-r-2 border-foreground gap-2">
//             <Clock className="text-primary" size={20} />
//             <p className="text-foreground">
//               {/* {firstStartTimeString} - {firstEndTimeString} */}
//               TBD
//             </p>
//           </div>

//           <div className="flex items-center justify-center w-1/2 md:w-1/5 border-r-2 border-foreground gap-2">
//             <IndianRupee className="text-primary" size={20} />
//             <p className="text-foreground">
//               {numberWithCommas(data.price_per_ticket)}/-
//             </p>
//           </div>

//           <Link
//             href={`${
//               data?.event_type === "internal"
//                 ? "https://web.vit.ac.in/rivierainternal"
//                 : "https://web.vit.ac.in/riviera"
//             }`}
//             className="flex items-center justify-center w-1/2 md:w-1/5 bg-primary text-primary-foreground font-bold hover:opacity-90"
//           >
//             REGISTER &gt;
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
