interface EventHeaderProps {
  venue: string;
  time: string;
  date: string;
}

export default function EventHeader({ venue, time, date }: EventHeaderProps) {
  return (
    <div className="relative w-full max-w-[354px] mx-auto py-4">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 354 58" 
        fill="none"
        className="w-full h-auto"
        aria-hidden="true"
      >
        <path 
          strokeDasharray="2 2"
          strokeWidth="0.7"
          stroke="white"
          d="M1 51.7817V6.55421C3.28523 6.55401 5.54802 6.40177 7.65932 6.10615C9.77202 5.81034 11.6917 5.37676 13.3087 4.83016C14.9256 4.28357 16.2083 3.63468 17.0834 2.92052C17.9585 2.20638 18.4089 1.44098 18.4089 0.668001L335.579 0.667969C335.579 1.44097 336.03 2.20639 336.905 2.92055C337.78 3.63471 339.063 4.2836 340.68 4.8302C342.297 5.37679 344.216 5.81037 346.329 6.10618C348.442 6.40199 350.706 6.55425 352.993 6.55425V0.667969L353 0.668003V57.668H1V57.6679H18.4089C18.4089 56.895 17.9585 56.1295 17.0834 55.4154C16.2083 54.7012 14.9256 54.0523 13.3086 53.5057C11.6917 52.9591 9.77201 52.5256 7.65932 52.2297C5.54801 51.9341 3.28523 51.7819 1 51.7817ZM335.579 57.668C335.579 56.895 336.03 56.1296 336.905 55.4154C337.78 54.7012 339.063 54.0523 340.68 53.5058C342.297 52.9592 344.216 52.5256 346.329 52.2298C348.442 51.934 350.706 51.7817 352.993 51.7817V57.668H335.579Z"
        />
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <p className="text-primary-foreground text-center font-editorial text-sm md:text-md leading-normal tracking-wide truncate">
          {venue} | {time} | {date}
        </p>
      </div>  
    </div>
  );
}

