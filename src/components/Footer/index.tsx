"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

export default function Footer() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, {
    amount: 0.1,
  })

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={`relative w-full overflow-hidden ${isMobileOrTablet ? "bg-[#853BFF]" : ""}`}
    >
      {!isMobileOrTablet && (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 557"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          initial={{ pathLength: 0, fill: "none" }}
          animate={{ pathLength: 1, fill: "#853BFF" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <path d="M1920 14.1721V557H0V9.9617L1.37701 9.73593V53.3611L267.197 9.82997V49.0618L566.44 0V43.6252L832.26 0.0940399V55.5877L960 34.5V34.7581L1161.2 0.0940399V55.6716L1441.38 9.73593V53.3611L1707.2 9.82997V49.0618L1920 14.1721Z" />
        </motion.svg>
      )}

      {/* Footer Logo Background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <div className="relative w-full h-[80%] max-w-6xl max-h-[80vh]">
          <Image
            src="/images/footerLogo.png"
            alt="Riviera Logo 2025 Background"
            fill
            className="object-contain"
            quality={100}
            priority
          />
        </div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="flex flex-col items-center lg:items-start gap-8 mb-12">
          {/* Responsive Riviera logo */}
          <motion.div variants={itemVariants} className="w-full sm:w-4/5 md:w-3/4 lg:w-[35%] relative mt-8 xl:ml-16">
            <div className="relative aspect-[3.38/1]">
              <Image
                src="/images/riviera.png"
                alt="Riviera 2025"
                fill
                className="object-contain object-center lg:object-left"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 75vw, 35vw"
                priority
              />
            </div>
          </motion.div>

          {/* Social Icons - Centered with contained background */}
          <motion.div variants={itemVariants} className="flex justify-center w-full">
            <div className="inline-flex items-center gap-8 bg-[#CCFF00] px-8 py-3 rounded-md">
              {[
                { icon: Instagram, href: "https://www.instagram.com/in/rivieravituniversity/" },
                { icon: Linkedin, href: "https://www.linkedin.com/rivieravituniversity/" },
                { icon: Youtube, href: "https://www.youtube.com/@RivieraVITUniversity" },
                { icon: Facebook, href: "https://www.facebook.com/rivieravituniversity/" },
              ].map((social, index) => (
                <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link href={social.href} className="transition-opacity hover:opacity-80">
                    <social.icon className="w-8 h-8 text-black" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "DR K GOKUL KUMAR",
              title: "Convenor, Riviera '25",
              email: "convenor.riviera@vit.ac.in",
            },
            {
              name: "Dr. Mohana Priya A.",
              title: "Co-Convenor, Riviera '25",
              email: "mohanapriyaa@vit.ac.in",
            },
            {
              name: "Mr. Dinesh Raghavan E. S.",
              title: "Co-Convenor, Riviera '25",
              email: "dinesh.raghavan@vit.ac.in",
            },
            {
              name: "Dr. Gitanjali J",
              title: "Co-Convenor, Riviera '25",
              email: "gitanjalij@vit.ac.in",
            },
          ].map((contact, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center lg:text-left flex flex-col items-center lg:place-items-center space-y-2"
            >
              <h3 className="text-[#CCFF00] text-4xl md:text-5xl xl:text-6xl font-fk-trial">{contact.name}</h3>
              <p className="text-primary-foreground text-lg sm:text-xl md:text-2xl font-editorial">{contact.title}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={`mailto:${contact.email}`}
                  className="text-primary-foreground hover:text-[#CCFF00] transition-colors text-lg sm:text-xl md:text-2xl font-editorial"
                >
                  {contact.email}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {!isMobileOrTablet && (
        <motion.div
          className="absolute top-3 right-10 w-1/4 h-1/4 sm:w-1/5 sm:h-1/5 lg:w-[30vw] lg:h-[30vh] pointer-events-none"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        >
          <Image src="/images/footerImages.png" alt="Stickers" fill className="object-contain" />
        </motion.div>
      )}
    </motion.div>
  )
}

