'use client'
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

const Navbar = () => {
  const [menu, setMenu] = useState(false)
  
  const navLinks = [
    { href: "#", text: "HOME" },
    { href: "#", text: "ABOUT" },
    { href: "#", text: "EVENTS" },
    { href: "#", text: "TEAM" },
    { href: "#", text: "FAQs" }
  ];

  const containerVariants = {
    hidden: { 
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const linkVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    initial: { 
      opacity: 0,
      x: -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5
      }
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const menuVariants = {
    initial: { height: 0 },
    animate: { 
      height: "100vh",
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      height: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const hoverVariants = {
    initial: { 
      color: "var(--foreground)",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    hover: { 
      color: "var(--primary)",
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };
  
  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1, delay: 2 }} 
        className='fixed top-0 left-0 right-0 flex justify-between w-full px-4 md:px-6 py-4 z-[101] items-center'
      >
        <div className={`flex flex-row w-auto ${menu ? 'invisible' : 'visible'} transition-all sm:delay-500`}>
          <Image src="/images/nav-vit-og.svg" alt='vit logo' width="134" height="52" className='w-1/2'/>
          <Image src="/images/nav-vit-40.svg" alt='vit logo' width="96" height="52" className='w-1/4'/>
        </div>
        <motion.button 
          onClick={() => { setMenu(!menu)}} 
          className='font-fk-trial font-bold text-3xl'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {menu ? "Close" : "Menu"}
        </motion.button>
      </motion.div>
      
      {/* Menu overlay */}
      <AnimatePresence mode="wait">
        {menu && (
          <motion.div 
            id="myNav"
            className="fixed inset-0 flex-col flex overlay z-[100]"
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className='flex m-6 flex-col-reverse sm:flex-row'>
              <div className='lg:w-[50vw] w-[100vw] invisible lg:visible  overlay-content'>
                <motion.div
                  variants={imageVariants}
                  initial="initial"
                  animate="visible"
                  exit="exit"
                >
                  <Image 
                    src="/images/nav-img.svg" 
                    alt="display image" 
                    width="100" 
                    height="100" 
                    className='-translate-x-5 w-auto h-full'
                  />
                </motion.div>
              </div>
              <div className="flex flex-col justify-between items-center lg:w-[50vw] w-[100vw] min-h-screen pb-8 overflow-hidden overlay-content">
                <div className='self-start'>
                  <Image 
                    src="/images/nav-support.svg" 
                    alt='image here' 
                    width="100" 
                    height="100" 
                    className='sm:w-96 sm:h-16 w-52'
                  />
                </div>
                <motion.div 
                  className='flex flex-col'
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={index}
                      variants={linkVariants}
                    >
                      <motion.div 
                        variants={hoverVariants}
                        initial="initial"
                        whileHover="hover"
                      >
                        <Link 
                          href={link.href} 
                          className='text-[6rem] font-fk-trial tracking-wide leading-[5rem] font-bold'
                        >
                          {link.text}
                        </Link>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
                <div className='text-center'>
                  <h1 className='font-fk-trial text-4xl font-bold'>RAISE THE CRAZE.</h1>
                  <h1 className='font-editorial'>Get ready to move, groove and shine. </h1>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;