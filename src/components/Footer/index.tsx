import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className='bg-footer'>
      <div>
        <Image src="/images/footer-riviera.svg" alt='riviera 2025 img' width={100} height={100} className='w-auto h-full'/>
        <div>
          <div>
            <h1>Contact Us</h1>
            <h3>Dr K Gokul Kumar </h3>
            <h3>Convenor, Riviera</h3>
            <h3>convenor.riviera@vit.ac.in</h3>
          </div>
          <div>
            <Image src="/images/footer-barcode.svg" alt='riviera 2025 img' width={100} height={100} className='w-auto h-full'/>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Footer
