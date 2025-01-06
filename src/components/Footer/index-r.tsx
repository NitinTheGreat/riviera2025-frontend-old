import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className='bg-footer'>
      <div className='mx-16 pt-10'>
        <div className='flex justify-between w-full h-56'>
          <Image src="/images/footer-riviera.svg" alt='riviera 2025 img' width={100} height={100} className='w-auto h-full'/>
          <div className='flex items-center'>
            <div className='bg-black p-[17px] pr-10 rounded-xl font-editorial'>
              <h1 className='text-5xl font-fk-trial font-bold'>Contact Us</h1>
              <h3>Dr K Gokul Kumar </h3>
              <h3>Convenor, Riviera</h3>
              <h3>convenor.riviera@vit.ac.in</h3>
            </div>
            <div className='bg-black p-[7px] rounded-xl'>
              <Image src="/images/footer-barcode.svg" alt='riviera 2025 img' width={100} height={100} className='w-auto h-[8.7rem] py-3'/>
            </div>
          </div>
        </div>
        <div className='mt-24 relative'>
          <div className='absolute w-full h-60 flex justify-center -top-32'>
            <Image src="/images/aboutVinyl.png" alt='CD' width={1000} height={1000} className='h-full w-auto'></Image>
          </div>
          <Image src="/images/footer-vinyl.svg" width={1000} height={1000} alt='Footer image' className='w-auto'/>
        </div>
      </div>
      
    </div>
  )
}

export default Footer
