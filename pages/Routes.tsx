
import React, { useState } from 'react';
import { Search, MapPin, ChevronRight, Filter } from 'lucide-react';
import { MOCK_ROUTES } from '../constants';
import { Page } from '../types';

interface RoutesProps {
  onNavigate: (page: Page, routeId?: string) => void;
}

const Routes: React.FC<RoutesProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoutes = MOCK_ROUTES.filter(route => 
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    route.busNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">Bus Routes</h2>
          <p className="text-gray-500 mt-1">Select a route to view its live status</p>
        </div>
        <div className="flex space-x-2">
           <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search routes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all w-full md:w-64"
            />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredRoutes.length > 0 ? filteredRoutes.map((route) => (
          <div 
            key={route.id}
            onClick={() => onNavigate('track', route.id)}
            className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between"
          >
            <div className="flex items-center space-x-6 w-full md:w-auto">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {route.name}
                </h3>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                    {route.busNumber}
                  </span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    route.status === 'On Time' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                  }`}>
                    {route.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center mt-6 md:mt-0 space-x-8 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Major Stops</p>
                <p className="text-xs text-gray-500 mt-1">{route.stops.length} Stations Available</p>
              </div>
              <button className="flex items-center px-4 py-2 bg-gray-50 text-blue-600 rounded-lg font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                Track Now
                <ChevronRight className="ml-1 w-4 h-4" />
              </button>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
               <Search className="w-8 h-8" />
             </div>
             <h3 className="text-lg font-bold text-gray-500">No routes found</h3>
             <p className="text-gray-400">Try searching with a different keyword</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Routes;
