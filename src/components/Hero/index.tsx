"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function calculateDaysToEvent() {
  const eventDate = new Date("2025-02-23");
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
  const daysToGo = calculateDaysToEvent();

  return (
    <div className=" w-full h-screen overflow-hidden bg-background">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 1 }}
      >
        <Image
          src="/images/heroimg.png"
          alt="Hero Background"
          fill
          className="object-cover absolute"
          quality={100}
          priority
        />
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
            transition={{ duration: 1.5, delay: 0.5 }}
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
            transition={{ duration: 1, delay: 0.2 }}
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
            className="relative z-10 text-center md:text-left space-y-2 md:space-y-3 "
            initial="hidden"
            animate="visible"
            variants={slideUp}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h1 className="text-primary-foreground text-4xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl font-medium uppercase tracking-wide font-fk-trial lg:ml-40">
              RAISE THE CRAZE
            </h1>
            <h2 className="text-primary-foreground text-xl sm:text-base md:text-lg lg:text-lg xl:text-xl font-normal font-editorial lg:ml-20">
              Get ready to move, groove and shine
            </h2>
          </motion.div>
        </div>

        {/* Updated Countdown section */}
        <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-[15vh] sm:bottom-[15vh] md:left-auto md:right-[0vw] md:bottom-[10vh] lg:bottom-[30px] md:translate-x-0 flex items-center justify-center md:w-auto">
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
                // width: "400px",
                height: "170px",
              }}
            >
              <span className="text-primary-foreground absolute bottom-[15%] left-[25%] text-xl md:text-3xl tracking-wider font-fk-trial whitespace-nowrap">
                {daysToGo} DAYS TO GO!!
              </span>
            </div>
          </div>
        </div>

        {/* Sponsors */}
        {/* <motion.div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-full px-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 items-center opacity-80">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i} 
                className="relative h-3 w-10 sm:h-4 sm:w-12 md:h-5 md:w-16 lg:h-6 lg:w-20 xl:h-8 xl:w-24"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                    }
                  }
                }}
              >
                <Image
                  src={`/images/sponsor-${i}.png`}
                  alt={`Sponsor ${i}`}
                  fill
                  className="object-contain brightness-200"
                />
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </div>
  );
}

export { Hero };
