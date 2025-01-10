import { Calendar, Clock, IndianRupee } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col mt-24 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:justify-start sm:gap-12 gap-2">
        <div className="flex flex-col items-start gap-2 h-auto sm:min-w-[25rem] relative">
          <div className="w-full h-[25rem] max-w-[25rem] bg-gray-700 rounded" />
        </div>
        <div className="w-full">
          <div className="h-12 w-3/4 mb-2 bg-gray-700 rounded" />
          <div className="h-6 w-1/2 mb-5 bg-gray-700 rounded" />
          <hr className="mt-5" />
          <div className="flex items-center mt-2">
            <IndianRupee className="text-primary" />
            <div className="h-8 w-24 ml-2 bg-gray-700 rounded" />
          </div>
          <div className="h-6 w-32 mt-2 bg-gray-700 rounded" />
          <div className="h-20 w-full mt-4 bg-gray-700 rounded" />
          <div className="h-20 w-full mt-4 bg-gray-700 rounded" />
          <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col sm:col-span-3">
              <div className="h-8 w-48 mb-2 bg-gray-700 rounded" />
              <div className="h-6 w-32 bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-[7vh] left-0 w-full h-16 z-50 font-editorial">
        <div className="h-full w-full max-w-[70vw] md:max-w-[90%] mx-auto flex flex-row border-2 border-foreground bg-background">
          <div className="hidden md:flex flex-col justify-center items-start pl-4 w-1/4 border-r-2 border-foreground">
            <div className="h-6 w-3/4 mb-1 bg-gray-700 rounded" />
            <div className="h-4 w-1/2 bg-gray-700 rounded" />
          </div>
          <div className="hidden md:flex items-center justify-center w-1/5 border-r-2 border-foreground gap-2">
            <Calendar className="text-primary" size={20} />
            <div className="h-4 w-16 bg-gray-700 rounded" />
          </div>
          <div className="hidden md:flex items-center justify-center w-1/5 border-r-2 border-foreground gap-2">
            <Clock className="text-primary" size={20} />
            <div className="h-4 w-24 bg-gray-700 rounded" />
          </div>
          <div className="flex items-center justify-center w-1/2 md:w-1/5 border-r-2 border-foreground gap-2">
            <IndianRupee className="text-primary" size={20} />
            <div className="h-4 w-16 bg-gray-700 rounded" />
          </div>
          <div className="flex items-center justify-center w-1/2 md:w-1/5 bg-primary">
            <div className="h-6 w-24 bg-primary-foreground rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

