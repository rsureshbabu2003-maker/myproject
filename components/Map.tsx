
import React, { useEffect, useState, useMemo } from 'react';
import { MapPin, Navigation, Info } from 'lucide-react';
import { Coordinate, BusRoute, Stop } from '../types';

interface MapProps {
  route: BusRoute;
  currentPos: Coordinate;
}

const Map: React.FC<MapProps> = ({ route, currentPos }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Helper to convert LatLng to SVG space (Simplified Dindigul region mapping)
  // Range approximately: Lat 9.8 to 10.6, Lng 77.4 to 78.2
  const toSVG = (coord: Coordinate) => {
    const x = ((coord.lng - 77.4) / (78.2 - 77.4)) * 500;
    const y = 500 - ((coord.lat - 9.8) / (10.6 - 9.8)) * 500;
    return { x, y };
  };

  const busPos = toSVG(currentPos);
  const pathPoints = route.path.map(p => {
    const s = toSVG(p);
    return `${s.x},${s.y}`;
  }).join(' ');

  if (!isLoaded) {
    return (
      <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center rounded-xl animate-pulse">
        <p className="text-gray-400 font-medium flex items-center">
          <Navigation className="w-5 h-5 mr-2 animate-spin" />
          Loading Live Map...
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] bg-blue-50/30 overflow-hidden rounded-xl border border-gray-200 shadow-inner">
      <svg viewBox="0 0 500 500" className="w-full h-full">
        {/* Simplified Roads / Grid Background */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Route Line */}
        <polyline
          points={pathPoints}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8,4"
          className="opacity-60"
        />

        {/* Stops */}
        {route.stops.map(stop => {
          const { x, y } = toSVG(stop.coordinate);
          return (
            <g key={stop.id}>
              <circle cx={x} cy={y} r="6" fill="white" stroke="#3b82f6" strokeWidth="2" />
              <text 
                x={x + 10} 
                y={y + 5} 
                className="text-[10px] fill-gray-500 font-medium select-none"
              >
                {stop.name}
              </text>
            </g>
          );
        })}

        {/* The Bus Marker */}
        <g 
          className="transition-all duration-1000 ease-linear"
          style={{ transform: `translate(${busPos.x}px, ${busPos.y}px)` }}
        >
          <circle r="12" fill="#2563eb" className="animate-ping opacity-20" />
          <circle r="8" fill="#2563eb" stroke="white" strokeWidth="2" />
          <g transform="translate(-8, -25)">
            <rect width="16" height="12" rx="2" fill="#2563eb" />
            <path d="M4 12 L4 14 M12 12 L12 14" stroke="#2563eb" strokeWidth="2" />
          </g>
        </g>
      </svg>

      {/* Floating Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50">
          <Navigation className="w-5 h-5 text-blue-600" />
        </button>
        <button className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50">
          <Info className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Map Attribution */}
      <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/80 backdrop-blur-sm rounded text-[10px] text-gray-400">
        © OpenData Dindigul • Live GPS
      </div>
    </div>
  );
};

export default Map;
