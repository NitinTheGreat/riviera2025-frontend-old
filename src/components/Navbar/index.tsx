"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      // Change background after scrolling 150px
      const isScrolled = window.scrollY > 200
      setScrolled(isScrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", text: "HOME" },
    { href: "/#about", text: "ABOUT" },
    { href: "/externalEvents", text: "EXTERNAL EVENTS" },
    { href: "/events", text: "INTERNAL EVENTS" },
    { href: "/faq", text: "FAQs" },
  ]

  const containerVariants = {
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        when: "beforeChildren",
      },
    },
  }

  const linkVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const imageVariants = {
    initial: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5,
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const menuVariants = {
    initial: {
      height: 0,
      opacity: 0.8,
      pointerEvents: "none" as const,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    animate: {
      height: "100dvh",
      opacity: 1,
      pointerEvents: "auto" as const,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const hoverVariants = {
    initial: {
      color: "var(--foreground)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    hover: {
      color: "var(--primary)",
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  }

  const handleClickLogo = () => {
    router.push("https://www.vit.ac.in")
    setMenu(false)
  }
  const handleClick40yr = () => {
    router.push("/")
    setMenu(false)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`fixed top-0 left-0 right-0 flex justify-between items-center w-full h-20 z-[101] p-4 transition-colors duration-300 ${
          scrolled ? " backdrop-blur-md bg-opacity-40 bg-slate-950" : ""
        }`}
      >
        <div
          className="flex items-center h-full w-auto"
          // onClick={handleClickLogo}
        >
          <div className="flex items-center h-full w-auto" onClick={handleClickLogo}>
            <Image
              src="/images/nav-logo-comb.svg"
              alt="vit logo"
              width={1000}
              height={1000}
              className="w-auto h-full object-contain hidden sm:block"
            />
          </div>
          <div className="flex items-center h-full w-auto" onClick={handleClick40yr}>
            <Image
              src="/images/nav-40.svg"
              alt="vit logo"
              width={1000}
              height={1000}
              className="w-auto h-full object-contain sm:hidden p-1"
            />
          </div>
        </div>
        <Link className="h-20 py-4" href="/">
          <Image
            src="/images/nav-riviera.svg"
            width={1000}
            height={1000}
            alt="riviera home page "
            className="md:-translate-x-[65%] w-auto h-full object-contain scale-75 sm:scale-100"
          />
        </Link>
        <motion.button
          onClick={() => {
            setMenu(!menu)
          }}
          className="font-fk-trial font-bold text-3xl mr-3"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {menu ? "CLOSE" : "MENU"}
        </motion.button>
      </motion.div>

      {/* Menu overlay */}
      <motion.div
        id="myNav"
        className="fixed inset-0 flex-col w-full z-[100] bg-background overflow-y-hidden"
        variants={menuVariants}
        initial="initial"
        animate={menu ? "animate" : "initial"}
      >
        <div className="flex m-6 flex-row">
          <div className="lg:flex flex-col justify-center lg:w-[50vw] hidden ">
            <motion.div variants={imageVariants} initial="initial" animate="visible" exit="exit">
              <Image
                src="/images/nav-img.svg"
                alt="display image"
                width="100"
                height="100"
                className="-translate-x-5 w-auto h-full"
              />
            </motion.div>
          </div>
          <div className="flex flex-col justify-between items-center lg:w-[50vw] w-[100vw] h-dvh pb-8 overflow-hidden ">
            <div className="self-start">
              <Image
                src="/images/nav-support.svg"
                alt="image here"
                width="100"
                height="100"
                className="sm:w-96 sm:h-16 invisible "
              />
            </div>
            <motion.div
              className="flex flex-col space-y-4 sm:space-y-6 md:space-y-6 lg:space-y-2"
              variants={containerVariants}
              initial="hidden"
              animate={menu ? "visible" : "hidden"}
            >
              {navLinks.map((link, index) => (
                <motion.div key={index} variants={linkVariants}>
                  <motion.div variants={hoverVariants} initial="initial" whileHover="hover">
                    <Link
                      href={link.href}
                      // className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-fk-trial tracking-wide leading-tight font-bold"
                      className="text-[4rem] xl:text-[6rem] font-fk-trial tracking-wide leading-[4rem] xl:leading-[6rem] font-bold"
                      onClick={() => {
                        setMenu(false)
                      }}
                    >
                      {link.text}
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
            <div className="text-center mb-5">
              <h1 className="font-fk-trial text-2xl sm:text-3xl md:text-4xl font-bold">RHYTHM OF REALM</h1>
              <h1 className="font-editorial text-sm sm:text-base md:text-lg">Get ready to move, groove and shine. </h1>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Navbar

