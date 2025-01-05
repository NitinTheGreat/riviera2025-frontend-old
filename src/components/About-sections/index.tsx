import Image from 'next/image'

export default function AboutSections() {
  return (
    <main className="relative w-full">
      {/* About Riviera Section */}
      <section className="relative min-h-screen w-full overflow-hidden bg-white py-16">
        <div className="mx-auto w-full px-4 md:px-6">
          <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Vinyl Record Side */}
            <div className="relative aspect-square w-full max-w-2xl">
              <div className="absolute inset-0 z-0">
                {/* Purple geometric shapes */}
                <div className="absolute left-0 top-1/4 h-24 w-full -skew-y-6 transform bg-[#7C3AED]" />
                <div className="absolute left-0 top-1/2 h-24 w-full skew-y-6 transform bg-[#7C3AED]" />
              </div>
              
              {/* Vinyl record */}
              <div className="relative h-full w-full animate-[spin_20s_linear_infinite] rounded-full bg-black">
                <div className="absolute left-1/2 top-1/2 h-[98%] w-[98%] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-zinc-800">
                  <div className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-zinc-800">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Riviera event"
                      width={400}
                      height={400}
                      className="rounded-full object-cover"
                      priority
                    />
                    {/* Gold sticker */}
                    <div className="absolute -right-4 bottom-8 h-16 w-16 rounded-full bg-yellow-500 p-2 text-center text-[8px] font-bold text-black">
                      DIRECT
                      <br />
                      MASTERED
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content Side */}
            <div className="flex flex-col justify-center">
              <div className="relative">
                <div className="absolute right-0 top-0">
                  <Image
                    src="/placeholder.svg?height=50&width=100"
                    alt="CE certification"
                    width={100}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <h1 className="text-6xl font-black tracking-tighter md:text-7xl lg:text-8xl">
                  ABOUT
                  <br />
                  RIVIERA
                </h1>
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
      </section>

      {/* About VIT Section */}
      <section className="relative min-h-screen w-full bg-black py-16 text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="VIT campus life"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>

        <div className="relative z-10 mx-auto w-full px-4 md:px-6">
          <h1 className="text-6xl font-black tracking-tighter md:text-7xl lg:text-8xl">
            ABOUT
            <br />
            VIT VELLORE
          </h1>
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

