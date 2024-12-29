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
        {/* Main content area */}
        <div className="relative flex-grow flex flex-col items-center justify-center md:items-start md:justify-end md:pb-20 px-4 sm:px-6 md:px-12 lg:px-24">
          {/* Background logo (rivieralogolight.png) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/rivieralogolight.png"
              alt="Riviera Logo 2025 Background"
              fill
              className="object-cover md:object-contain md:object-left-bottom"
              quality={100}
              priority
            />
          </div>
          
          {/* Main logo (riviera.png) */}
          <div className="relative z-10 w-full max-w-[95%] md:max-w-[54%] aspect-[3/1] mb-8 md:mb-12">
            <Image
              src="/images/riviera.png"
              alt="Riviera"
              fill
              className="object-contain"
              quality={100}
              priority
            />
          </div>

          {/* Text content */}
          <div className="relative z-10 text-center md:text-left space-y-2 md:space-y-4">
            <h1 className="text-[#F6F6F6] text-4xl sm:text-5xl md:text-6xl lg:text-[65px] font-medium uppercase tracking-wide font-['FK_Screamer_Trial']">
              RAISE THE CRAZE
            </h1>
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-[29px] font-normal font-['PP_Editorial_New']">
              Get ready to move, groove and shine
            </h2>
          </div>
        </div>

        {/* Updated Countdown section with improved responsiveness and text positioning */}
        <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-20 md:left-auto md:right-4 lg:right-8 xl:right-12 md:translate-x-0 flex items-center">
          <div className="relative h-[120px] w-[120px] sm:h-[140px] sm:w-[140px] md:h-[160px] md:w-[160px] lg:h-[180px] lg:w-[180px]
            -translate-x-[-45%] -translate-y-[-20%] z-30">
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
              className="bg-[#7C3AED] flex items-center justify-center p-4 sm:p-6 md:p-8"
              style={{
                clipPath:'polygon(51% 61%, 85% 45%, 84% 67%, 82% 100%, 0 100%, 11% 67%, 51% 54%)',
                width: 'clamp(240px, 50vw, 453px)',
                height: 'clamp(100px, 20vw, 193px)'
              }}
            >
              <span className="text-white absolute bottom-[10%] text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-['FK_Screamer_Trial'] whitespace-nowrap">
                {daysToGo} DAYS TO GO!!
              </span>
            </div>
          </div>
        </div>

        {/* Sponsors */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-full px-4">
          <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 items-center opacity-80">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative h-4 w-12 sm:h-5 sm:w-16 md:h-6 md:w-20 lg:h-8 lg:w-24">
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

