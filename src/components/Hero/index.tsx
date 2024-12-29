'use client'

import Image from "next/image"
import { motion } from "framer-motion"

function calculateDaysToEvent() {
  const eventDate = new Date('2025-02-23')
  const today = new Date()
  const diffTime = eventDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

export default function Hero() {
  const daysToGo = calculateDaysToEvent()

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
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
          className="object-cover"
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
              src="/images/riviera.png"
              alt="Riviera"
              fill
              className="object-contain object-center md:object-left"
              quality={100}
              priority
            />
          </motion.div>

          {/* Text content */}
          <motion.div 
            className="relative z-10 text-center md:text-left space-y-2 md:space-y-3 lg:ml-40"
            initial="hidden"
            animate="visible"
            variants={slideUp}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h1 className="text-primary-foreground text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-medium uppercase tracking-wide font-['FK Screamer Trial']">
              RAISE THE CRAZE
            </h1>
            <h2 className="text-primary-foreground text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl font-normal font-['PP Editorial New']">
              Get ready to move, groove and shine
            </h2>
          </motion.div>
        </div>

           {/* Updated Countdown section with improved responsiveness and text positioning */}
    <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-[15vh] md:left-auto md:right-[-5vw] md:bottom-[10vh] md:translate-x-0 flex items-center justify-center md:w-auto">
      <div className="relative h-[120px] w-[120px] sm:h-[140px] sm:w-[140px] md:h-[160px] md:w-[160px] lg:h-[180px] lg:w-[180px] xl:h-[200px] xl:w-[200px]
        -translate-x-[-44%] -translate-y-[-20%] z-30">
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
          className="bg-primary flex items-center justify-center p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8"
          style={{
            clipPath: 'polygon(49% 42%, 49% 51%, 80% 44%, 79% 100%, 0 100%, 8% 70%, 15% 51%)',
            width: 'clamp(240px, 45vw, 480px)',
            height: 'clamp(100px, 19vw, 204px)'
          }}
        >
          <span className="text-primary-foreground absolute bottom-[15%] left-[20%] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold font-['FK_Screamer_Trial'] whitespace-nowrap">
            {daysToGo} DAYS TO GO!!
          </span>
        </div>
      </div>
    </div>


        {/* Sponsors */}
        <motion.div 
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
        </motion.div>
      </div>
    </div>
  )
}

export { Hero }

