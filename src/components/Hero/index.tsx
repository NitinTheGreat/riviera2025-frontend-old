import Image from "next/image"

function calculateDaysToEvent() {
  const eventDate = new Date('2025-02-23')
  const today = new Date()
  const diffTime = eventDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export default function Hero() {
  const daysToGo = calculateDaysToEvent()

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#070719]">
      <Image
        src="/images/heroimg.png"
        alt="Hero Background"
        fill
        className="object-cover"
        quality={100}
        priority
      />

      <div className="absolute inset-0 flex flex-col justify-between">
        <div className="flex-grow flex items-center">
          <div className="relative w-full md:w-[45vw] h-[50vh] md:h-screen">
            <Image
              src="/images/rivieralogolight.png"
              alt="Riviera Logo 2025"
              fill
              className="object-contain object-center md:object-left"
              quality={100}
              priority
            />
          </div>
        </div>

        <div className="px-6 md:px-24 pb-20 md:pb-32 space-y-4">
          <h2 className="text-white text-xl md:text-2xl font-light tracking-wider">
            Get ready to move, groove and shine
          </h2>
          <h1 className="text-white text-4xl md:text-6xl font-bold tracking-wide">
            RAISE THE CRAZE
          </h1>
        </div>

        <div className="absolute bottom-20 right-0 z-20">
          <div className="bg-[#7C3AED] py-3 md:py-4 px-6 md:px-8 rounded-l-full">
            <span className="text-white text-xl md:text-2xl font-bold">{daysToGo} DAYS TO GO!!</span>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-full px-4">
          <div className="flex justify-center gap-4 md:gap-8 items-center opacity-80">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative h-6 md:h-8 w-16 md:w-24">
                <Image
                  src={`/images/sponsor-${i}.png`}
                  alt={`Sponsor ${i}`}
                  fill
                  className="object-contain brightness-200"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Hero }