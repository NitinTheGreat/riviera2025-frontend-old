'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Shuffle, SkipBack, Play, Pause, SkipForward } from 'lucide-react'
import { carouselImages } from '../../types/corousel'

export default function AboutSections() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
      }, 5000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying])

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    )
  }

  const shuffleImage = () => {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * carouselImages.length)
    } while (newIndex === currentImageIndex)
    setCurrentImageIndex(newIndex)
  }

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* About Riviera Section */}
      <section className="relative w-full min-h-screen bg-primary-foreground overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
            {/* Rotating Vinyl with Carousel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full lg:w-1/2 aspect-square max-w-[400px] lg:max-w-[600px] mb-24 lg:mb-0"
            >
              <div className="relative w-full h-full animate-[spin_20s_linear_infinite]">
                <Image
                  src="/images/aboutVinyl.png"
                  alt="Vinyl record"
                  fill
                  className="object-cover rounded-full"
                  priority
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 600px"
                />
                <div className="absolute left-1/2 top-1/2 h-[98%] w-[98%] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-zinc-800">
                  <div className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-zinc-800 overflow-hidden">
                    <Image
                      src={carouselImages[currentImageIndex].src}
                      alt={carouselImages[currentImageIndex].alt}
                      fill
                      className="rounded-full object-cover"
                      priority
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 600px"
                    />
                  </div>
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-primary-foreground px-6 py-3 rounded-full shadow-lg">
                <button
                  onClick={shuffleImage}
                  className="p-2 rounded-full hover:bg-primary-foreground transition-colors group"
                >
                  <Shuffle className="w-5 h-5 stroke-2 text-gray-700 group-hover:text-black" />
                </button>
                <button
                  onClick={previousImage}
                  className="p-2 rounded-full hover:bg-primary-foreground transition-colors group"
                >
                  <SkipBack className="w-5 h-5 stroke-2 text-gray-700 group-hover:text-black" />
                </button>
                {/* Can be removed later */}
                <button
                  onClick={togglePlayPause}
                  className="p-3 rounded-full bg-background text-primary-foreground hover:bg-gray-800 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current" />
                  )}
                </button>
                 {/* Can be removed later */}
                <button
                  onClick={nextImage}
                  className="p-2 rounded-full hover:bg-primary-foreground transition-colors group"
                >
                  <SkipForward className="w-5 h-5 stroke-2 text-gray-700 group-hover:text-black" />
                </button>
              </div>
            </motion.div>

            {/* Text Content Side */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-8 right-0">
                  <Image
                    src="/images/aboutBarcode.png"
                    alt="CE certification"
                    width={100}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-0"
                >
                  <h1 className="text-black font-fk-trial ml-4 md:ml-0 text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] font-bold leading-[0.85] tracking-[1.2px]">
                    ABOUT
                  </h1>
                  <h1 className="text-background font-fk-trial  ml-4 md:ml-0 text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] font-bold leading-[0.85] tracking-[3px]">
                    RIVIERA
                  </h1>
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-8 text-lg md:text-xl xl:mb-28 md:mb-16 leading-relaxed font-editorial text-background max-w-2xl text-justify px-4 md:px-0 [text-align-last:center] md:[text-align-last:left] [word-spacing:0.2em] md:[word-spacing:normal]"
                >
                Welcome to Riviera, VIT's heart—a 4-day explosion of sports, culture, and
                unbridled enthusiasm! 30,000+ students, 650+ colleges, and a whirlwind of
                events from dramatic face-offs to literary showdowns, musical crescendos,
                and defy-gravity dance-offs. Organized by VIT students, this rollercoaster
                happens in February, turning the campus into a kaleidoscope of talent and
                celebration. Join us for an unforgettable ride where the quirky and
                competitive collide!
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* Connecting Image */}
        <div className="absolute bottom-0 right-16 w-[44vw]  h-[50vh] lg:h-[120vh] pointer-events-none hidden lg:block">
          <div className="relative h-full w-full">
            <Image
              src="/images/aboutConnector1.png"
              alt="Stage lighting"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>
      </section>

      {/* About VIT Section */}
      <section className="relative w-full min-h-screen bg-background overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/aboutVIT.png"
            alt="VIT campus life"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        </div>

        {/* Connecting Image Continuation */}
        <div className="absolute top-0 right-16 w-[44vw] h-[50vh] lg:h-[60vh] pointer-events-none hidden lg:block">
          <div className="relative h-full w-full">
            <Image
              src="/images/aboutConnector2.png"
              alt="Stage lighting"
              fill
              className="object-contain object-top"
              priority
            />
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-6 flex items-center min-h-screen">
          <div className="w-full">
            <motion.div 
              className="space-y-0"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-primary-foreground  ml-4 md:ml-0 font-fk-trial text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] font-bold leading-[0.85] tracking-[1.2px]">
                ABOUT
              </h1>
              <h1 className="text-primary-foreground  ml-4 md:ml-0 font-fk-trial text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] font-bold leading-[0.85] tracking-[3px]">
                VIT VELLORE
              </h1>
            </motion.div>
            <motion.div 
              className="mt-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="mt-8 text-lg md:text-xl leading-relaxed font-editorial text-primary-foreground max-w-2xl text-justify px-4 md:px-0 [text-align-last:center] md:[text-align-last:left] [word-spacing:0.2em] md:[word-spacing:normal]">
                At VIT, our founding vision is the delivery of internationally benchmarked,
                quality higher education. We consistently embrace innovation to elevate
                educational standards. Our cosmopolitan campus hosts a diverse student body from
                across the globe. Our esteemed faculty, experienced and knowledgeable, is
                dedicated to nurturing students. The global benchmarks set by VIT in teaching
                and research drive our unwavering commitment to excellence, transcending
                aspiration to become an ingrained ethos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

