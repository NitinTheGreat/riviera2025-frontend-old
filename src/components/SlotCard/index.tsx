import React from 'react';
import Image from 'next/image';

// Define the props type
interface SlotCardProps {
  venue: string;
  startTimeString: string;
  endTimeString: string;
  startDate: string;
}

const SlotCard: React.FC<SlotCardProps> = ({ venue, startTimeString, endTimeString, startDate }) => {
  return (
    <div className="relative w-fit">
      <Image src="/images/Subtract.svg" alt="" height={100} width={100} className="w-auto h-full" />
      <p className='absolute top-[5px] left-3'>{`${venue} | ${startTimeString} - ${endTimeString} | ${startDate}`}</p>
    </div>
  );
};

export default SlotCard;
