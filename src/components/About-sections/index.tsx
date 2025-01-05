'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { CarouselControls } from '../Corousel-control'
import { carouselImages } from '../../types/corousel'

export default function AboutSections() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    )
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <main className="relative w-full">
      {/* About Riviera Section */}
      <section className="relative min-h-screen w-full overflow-hidden bg-primary-foreground flex items-center">
        <div className="mx-auto w-full px-4 md:px-6">
          <div className="relative grid gap-6 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Vinyl Record Side */}
            <div className="relative aspect-square w-full max-w-[80vw] sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
              <div className="absolute inset-0 z-0">
                {/* Purple geometric shapes */}
                <svg className="absolute top-0 left-0 w-full h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 848 438" fill="none">
                  <path d="M848 357.884L363.447 437.329V377.681L0 437.2V79.4442L484.553 0V59.6474L848 0.0642755V119.359L363.447 198.739V139.156L121.171 178.814V298.108L484.553 238.525V298.173L848 238.654V357.884Z" fill="#853BFF"/>
                </svg>
              </div>

              {/* Vinyl record */}
              <div className="relative h-full w-full animate-[spin_20s_linear_infinite] rounded-full bg-black">
                <div className="absolute left-1/2 top-1/2 h-[98%] w-[98%] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-zinc-800">
                  <div className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-zinc-800 overflow-hidden">
                    <Image
                      src={carouselImages[currentImageIndex].src}
                      alt={carouselImages[currentImageIndex].alt}
                      fill
                      className="rounded-full object-cover"
                      priority
                      sizes="(max-width: 640px) 80vw, (max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </div>

              {/* Carousel Controls */}
              <CarouselControls
                onPrevious={previousImage}
                onNext={nextImage}
                onPlayPause={togglePlayPause}
                isPlaying={isPlaying}
                className="absolute -bottom-16 left-1/2 -translate-x-1/2"
              />
            </div>

            {/* Text Content Side */}
            <div className="flex flex-col justify-center">
              <div className="relative">
                <div className="absolute right-0 top-0">
                  <Image
                    src="/images/aboutBarcode.png"
                    alt="CE certification"
                    width={100}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <div className="space-y-0">
                  <h1 className="text-black font-fk-trial text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] font-bold leading-[0.85] tracking-[1.2px]">
                    ABOUT
                  </h1>
                  <h1 className="text-black font-fk-trial text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] font-bold leading-[0.85] tracking-[3px]">
                    RIVIERA
                  </h1>
                </div>
                <p className="mt-6 text-lg leading-relaxed text-gray-700">
                  Welcome to Riviera, VIT's heart—a 4-day explosion of sports, culture, and
                  unbridled enthusiasm! 30,000+ students, 650+ colleges, and a whirlwind of
                  events from dramatic face-offs to literary showdowns, musical crescendos,
                  and defy-gravity dance-offs. Organized by VIT students, this rollercoaster
                  happens in February, turning the campus into a kaleidoscope of talent and
                  celebration. Join us for an unforgettable ride where the quirky and
                  competitive collide!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Connecting Image */}
        <div className="absolute bottom-0 right-[3.5vw] h-48 w-[45%] z-50">
          <Image
            src="/images/aboutConnector.png"
            alt="Stage lighting"
            fill
            className="object-contain"
          />
        </div>
      </section>

      {/* About VIT Section */}
      <section className="relative h-screen w-full bg-black flex items-center text-primary-foreground">
        {/* Background Image */}
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

        <div className="relative z-10 mx-auto w-full px-4 md:px-6">
          <div className="space-y-0">
            <h1 className="text-primary-foreground font-fk-trial text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] font-bold leading-[0.85] tracking-[1.2px]">
              ABOUT
            </h1>
            <h1 className="text-primary-foreground font-fk-trial text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] font-bold leading-[0.85] tracking-[3px]">
              VIT VELLORE
            </h1>
          </div>
          <div className="mt-8 max-w-3xl">
            <p className="text-lg leading-relaxed">
              At VIT, our founding vision is the delivery of internationally benchmarked,
              quality higher education. We consistently embrace innovation to elevate
              educational standards. Our cosmopolitan campus hosts a diverse student body from
              across the globe. Our esteemed faculty, experienced and knowledgeable, is
              dedicated to nurturing students. The global benchmarks set by VIT in teaching
              and research drive our unwavering commitment to excellence, transcending
              aspiration to become an ingrained ethos.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

