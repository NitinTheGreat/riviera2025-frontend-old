"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

function calculateDaysToEvent() {
  const eventDate = new Date("2025-02-20");
  // const eventDateString = process.env.EVENT_DATE;
  // if (!eventDateString) {
  //   return 0; // or handle the error as needed
  // }
  // const eventDate = new Date(eventDateString);
  const today = new Date();
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Hero() {
  const [daysToGo, setDaysToGo] = useState(calculateDaysToEvent());

  useEffect(() => {
    const timer = setInterval(() => {
      setDaysToGo(calculateDaysToEvent());
    }, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="relative w-full h-full bg-foreground opacity-50">
          <video
            src="/Hero-vid-2.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover"
          />
        </div>
      </motion.div>

      <div className="absolute inset-0 flex flex-col justify-between">
        {/* Main content area */}
        <div className="relative flex-grow flex flex-col items-center justify-start md:items-start pt-[30vh] px-4 sm:px-6 md:px-12 lg:px-24">
          {/* Background logo (rivieralogolight.png) */}
          <motion.div
            className="absolute inset-0 z-0"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 1.5, delay: 1.5 }}
          >
            <Image
              src="/images/rivieralogolight.png"
              alt="Riviera Logo 2025 Background"
              fill
              className="object-cover md:object-contain md:object-left-bottom"
              quality={100}
              priority
            />
          </motion.div>

          {/* Main logo (riviera.png) */}
          <motion.div
            className="relative z-10 w-full max-w-[95%] md:max-w-[54%] lg:max-w-[60%] xl:max-w-[54%] aspect-[3/1] mb-4"
            initial="hidden"
            animate="visible"
            variants={slideUp}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <Image
              src="/images/riviera.svg"
              alt="Riviera"
              fill
              className="object-contain object-center md:object-left"
              quality={100}
              priority
            />
          </motion.div>

          {/* Text content */}
          <motion.div
            className="relative z-10 text-center md:text-left space-y-2 md:space-y-3 w-full"
            initial="hidden"
            animate="visible"
            variants={slideUp}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <h1 className="text-primary-foreground text-4xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-6xl font-medium uppercase tracking-wide font-fk-trial md:ml-20 lg:ml-40">
              RAISE THE CRAZE
            </h1>
            <h2 className="text-primary-foreground text-xl sm:text-xl md:text-lg lg:text-lg xl:text-2xl font-normal font-editorial md:ml-8 lg:ml-24">
              Get ready to move, groove and shine
            </h2>
            <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-10 items-center justify-center md:justify-start lg:translate-x-10">
              <Link href="https://drive.google.com/file/d/1qOPvZi4Pzkh8caPdenV80OsU0jHufen0/view" target="_blank">
                <button className="w-full sm:w-fit justify-center rounded-xl text-foreground text-center text-sm sm:text-base md:text-[1.3rem] whitespace-nowrap font-editorial leading-[100%] bg-primary p-4 sm:p-6 px-6 sm:px-8">
                  Events Brochure
                </button>
              </Link>
              <Link href="https://www.youtube.com/watch?v=7Qp0XHHiU-0" target="_blank">
                <button className="w-full sm:w-fit justify-center rounded-xl text-foreground text-center text-sm sm:text-base md:text-[1.3rem] whitespace-nowrap font-editorial leading-[100%] bg-primary p-4 sm:p-6 px-6 sm:px-8">
                  2024 Aftermovie
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Countdown section */}
        <div className="absolute z-20 left-[45%] -translate-x-1/2 bottom-[11vh] lg:bottom-[4vh] md:left-auto md:right-[0vw] md:bottom-[10vh] md:translate-x-0 flex items-center justify-center md:w-auto">
          <div className="relative h-[160px] w-[160px] -translate-x-[-44%] -translate-y-[-20%] z-30">
            <Image
              src="/images/rivieralogowhite.png"
              alt="Countdown Logo"
              fill
              className="object-contain"
              quality={100}
            />
          </div>
          <div className="relative -ml-[10%]">
            <div
              className="bg-primary flex items-center justify-center w-64 md:w-80"
              style={{
                clipPath:
                  "polygon(49% 42%, 49% 51%, 80% 44%, 79% 100%, 0 100%, 8% 70%, 15% 51%)",
                height: "170px",
              }}
            >
              <span className="text-primary-foreground font-bold absolute bottom-[15%] left-[25%] text-xl md:text-3xl tracking-wider font-fk-trial whitespace-nowrap">
                {daysToGo} DAYS TO GO!!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };

