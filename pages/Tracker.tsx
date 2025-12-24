
import React, { useState, useEffect, useRef } from 'react';
import { Navigation, Info, Clock, User, Phone, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { BusRoute, BusState, Coordinate } from '../types';
import { MOCK_ROUTES } from '../constants';
import Map from '../components/Map';
import Timeline from '../components/Timeline';

interface TrackerProps {
  selectedRouteId: string | null;
}

const Tracker: React.FC<TrackerProps> = ({ selectedRouteId }) => {
  const route = MOCK_ROUTES.find(r => r.id === (selectedRouteId || 'R1')) || MOCK_ROUTES[0];
  
  const [pathIndex, setPathIndex] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      setPathIndex(prev => (prev + 1) % route.path.length);
      setTimeout(() => setIsUpdating(false), 800);
    }, 4000);

    return () => clearInterval(interval);
  }, [route]);

  // ETA Calculation (Simplified: purely based on index)
  const currentPos = route.path[pathIndex];
  const nextStopIndex = Math.min(Math.floor((pathIndex / route.path.length) * route.stops.length) + 1, route.stops.length - 1);
  const stopIndex = Math.min(Math.floor((pathIndex / route.path.length) * route.stops.length), route.stops.length - 1);
  const nextStop = route.stops[nextStopIndex];
  
  // Simulated Notification trigger
  useEffect(() => {
    if (pathIndex === 10) {
      const msg = "Bus arriving at " + route.stops[1].name + " in 5 minutes";
      setNotifications(prev => [msg, ...prev]);
      setTimeout(() => setNotifications(prev => prev.slice(1)), 8000);
    }
  }, [pathIndex, route]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Active Alerts */}
      {notifications.length > 0 && (
        <div className="mb-6 animate-in slide-in-from-top duration-300">
          {notifications.map((note, i) => (
            <div key={i} className="flex items-center p-4 bg-orange-50 border border-orange-100 rounded-xl text-orange-800 shadow-sm">
              <AlertCircle className="w-5 h-5 mr-3 text-orange-500" />
              <p className="text-sm font-bold">{note}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Col: Map & Primary Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <Map route={route} currentPos={currentPos} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center text-gray-400 mb-2">
                <Navigation className="w-4 h-4 mr-2" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Current Speed</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-gray-900">48</span>
                <span className="text-gray-400 font-medium">km/h</span>
                <div className="ml-auto">
                   <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded">Normal</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center text-gray-400 mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-[10px] font-bold uppercase tracking-wider">ETA Next Stop</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-blue-600">~12</span>
                <span className="text-gray-400 font-medium">mins</span>
                <div className="ml-auto flex items-center">
                   <div className={`w-2 h-2 rounded-full mr-2 ${isUpdating ? 'bg-blue-600' : 'bg-gray-300'}`} />
                   <span className="text-[10px] text-gray-400 font-bold uppercase">{isUpdating ? 'Updating' : 'Live'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Details & Timeline */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black text-gray-900">{route.busNumber}</h3>
                <p className="text-sm font-medium text-gray-500">{route.name}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500">
                  <User className="w-4 h-4 mr-3" />
                  <span className="text-sm">Driver</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{route.driverName}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500">
                  <Phone className="w-4 h-4 mr-3" />
                  <span className="text-sm">Emergency Contact</span>
                </div>
                <button className="text-sm font-bold text-blue-600 hover:underline">+91 98XXX XXX01</button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500">
                  <RefreshCw className="w-4 h-4 mr-3" />
                  <span className="text-sm">Last Sync</span>
                </div>
                <span className="text-xs font-medium text-gray-400">Just now</span>
              </div>
            </div>
          </div>

          <Timeline route={route} currentIndex={stopIndex} />
        </div>
      </div>
    </div>
  );
};

export default Tracker;
