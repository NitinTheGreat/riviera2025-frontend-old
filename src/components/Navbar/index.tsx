'use client'
import Image from 'next/image';
import { useState } from 'react';
import { motion } from "motion/react"
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
  const router = useRouter()
  const [menu, setMenu] = useState(false)
  
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2 }} className='fixed top-0 left-0 right-0 flex justify-end w-full gap-4 p-10 z-[100] items-center'>
        <button onClick={() => { setMenu(!menu)}} className='font-fk-trial font-bold text-3xl '>{menu ? "Close" : "Menu"}</button>
      </motion.div>
      <div id="myNav" className={`relative flex-col flex overlay ${menu ? "h-full" : "h-0"}`}>
        <div className='flex overflow-auto m-6'>
          <div className='w-[50vw] overflow-auto overlay-content'>
            <Image src="/images/nav-img.svg" alt="display image" width="100" height="100" className='w-auto h-full'></Image>
          </div>
          <div className="flex flex-col justify-between items-center w-[50vw] overflow-auto overlay-content">
            <div className='self-start'>
              <Image src="/images/nav-support.svg" alt='image here' width="100" height="100" className='w-96 h-16'></Image>
            </div>
            <div className='flex flex-col'>
              <Link href="#" className='text-[6rem] font-fk-trial tracking-wide leading-[5rem] hover:text-primary font-bold'>
                HOME
              </Link>
              <Link href="#" className='text-[6rem] font-fk-trial tracking-wide leading-[5rem] hover:text-primary font-bold'>
                ABOUT
              </Link>
              <Link href="#" className='text-[6rem] font-fk-trial tracking-wide leading-[5rem] hover:text-primary font-bold'>
                EVENTS
              </Link>
              <Link href="#" className='text-[6rem] font-fk-trial tracking-wide leading-[5rem] hover:text-primary font-bold'>
                TEAM
              </Link>
              <Link href="#" className='text-[6rem] font-fk-trial tracking-wide leading-[5rem] hover:text-primary font-bold'>
                FAQs
              </Link>
            </div>
            <div className='text-center'>
              <h1 className='font-fk-trial text-4xl font-bold'>RAISE THE CRAZE.</h1>
              <h1 className='font-editorial '>Get ready to move, groove and shine. </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;