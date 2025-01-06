'use client'

import { motion } from "framer-motion"
import Image from "next/image"

interface SponsorImage {
  src: string
  alt: string
}

interface BufferSectionProps {
  backgroundImage: string
  title: string
  sponsorImages?: SponsorImage[]
  description: string
}

export default function BufferSection({
  backgroundImage,
  title,
  sponsorImages,
  description,
}: BufferSectionProps) {
  return (
    <section className="absolute inset-0 w-full h-screen">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
        <Image
          src={backgroundImage}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 mix-blend-multiply" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center gap-12 md:gap-16 lg:gap-20 container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 md:gap-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1]
            }}
            className="text-[clamp(40px,10vw,180px)] text-primary-foreground text-center leading-none uppercase font-fk-trial"
          >
            {title}
          </motion.h1>

          {sponsorImages && sponsorImages.length > 0 && (
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-6 md:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {sponsorImages.map((sponsor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 } 
                  }}
                  className="h-5 sm:h-6 md:h-8"
                >
                  <Image
                    src={sponsor.src}
                    alt={sponsor.alt}
                    width={120}
                    height={40}
                    className="h-full w-auto object-contain brightness-100 invert opacity-90"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 0.6,
            ease: [0.76, 0, 0.24, 1]
          }}
          className="text-primary-foreground text-center max-w-4xl absolute bottom-[4vh] mx-auto px-4 break-words font-editorial"
          style={{ 
            fontSize: "clamp(20px, 3vw, 36px)",
            fontWeight: "400",
            lineHeight: "1.2",
          }}
        >
          {description}
        </motion.p>
      </div>
    </section>
  )
}

