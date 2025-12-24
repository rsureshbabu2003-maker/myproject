
import React from 'react';
import { CheckCircle, Clock, MapPin } from 'lucide-react';
import { BusRoute } from '../types';

interface TimelineProps {
  route: BusRoute;
  currentIndex: number;
}

const Timeline: React.FC<TimelineProps> = ({ route, currentIndex }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-blue-600" />
        Arrival Timeline
      </h3>
      <div className="relative space-y-8">
        {/* Line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100" />

        {route.stops.map((stop, index) => {
          const isPassed = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex;

          return (
            <div key={stop.id} className="relative flex items-start">
              {/* Dot */}
              <div 
                className={`z-10 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isPassed 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : isCurrent 
                    ? 'bg-white border-blue-600 text-blue-600' 
                    : 'bg-white border-gray-200 text-gray-300'
                }`}
              >
                {isPassed ? <CheckCircle className="w-3.5 h-3.5" /> : <div className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-blue-600 animate-pulse' : 'bg-gray-300'}`} />}
              </div>

              {/* Content */}
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-semibold ${isPassed ? 'text-gray-400' : 'text-gray-900'}`}>
                    {stop.name}
                  </span>
                  <span className={`text-xs font-mono px-2 py-1 rounded ${
                    isCurrent ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-500'
                  }`}>
                    {stop.eta}
                  </span>
                </div>
                {isCurrent && (
                  <p className="text-[11px] text-blue-600 mt-1 font-medium flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    Approaching Now
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
