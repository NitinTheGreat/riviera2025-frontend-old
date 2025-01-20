import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <div className="relative w-full bg-primary-foreground overflow-hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 557"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M1920 14.1721V557H0V9.9617L1.37701 9.73593V53.3611L267.197 9.82997V49.0618L566.44 0V43.6252L832.26 0.0940399V55.5877L960 34.5V34.7581L1161.2 0.0940399V55.6716L1441.38 9.73593V53.3611L1707.2 9.82997V49.0618L1920 14.1721Z"
          fill="#853BFF"
        />
      </svg>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="flex flex-col items-start gap-8 mb-12">
          <div className="w-full lg:w-[35%] relative aspect-[3.38/1]">
            <Image
              src="/images/riviera.png"
              alt="Riviera 2025"
              fill
              className="object-contain object-left"
              sizes="(max-width: 768px) 100vw, (max-width: 1920px) 35vw"
              priority
            />
          </div>

          <div className="flex items-center justify-center gap-6 w-full">
            {[
              { icon: Instagram, href: "https://www.instagram.com/in/rivieravituniversity/" },
              { icon: Linkedin, href: "https://www.linkedin.com/rivieravituniversity/" },
              { icon: Youtube, href: "https://www.youtube.com/@RivieraVITUniversity" },
              { icon: Facebook, href: "https://www.facebook.com/rivieravituniversity/" },
            ].map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="bg-[#CCFF00] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <social.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#853BFF]" />
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "DR K GOKUL KUMAR",
              title: "Convenor, Riviera '25",
              email: "convenor.riviera@vit.ac.in",
            },
            {
              name: "Dr. Mohana Priya A.",
              title: "Co-Convenor, Riviera '25",
              email: "9843111639",
            },
            {
              name: "Mr. Dinesh Raghavan E. S.",
              title: "Co-Convenor, Riviera '25",
              email: "9940164844",
            },
            {
              name: "Dr. Gitanjali J",
              title: "Co-Convenor, Riviera '25",
              email: "9790101549",
            },
          ].map((contact, index) => (
            <div key={index} className="text-center lg:text-left flex flex-col items-center lg:place-items-center space-y-2 ">
              <h3 className="text-[#CCFF00] text-2xl md:text-3xl xl:text-4xl font-fk-trial  font-bold ">{contact.name}</h3>
              <p className="text-primary-foreground text-lg md:text-xl  font-editorial">{contact.title}</p>
              <Link href={`mailto:${contact.email}`} className="text-primary-foreground hover:text-[#CCFF00] transition-colors text-lg md:text-xl font-editorial">
                {contact.email}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/4 h-1/4 sm:w-1/5 sm:h-1/5 lg:w-[20vw] lg:h-[20vh] pointer-events-none">
        <Image src="/images/footerImages.png" alt="Stickers" fill className="object-contain" />
      </div>
    </div>
  )
}

