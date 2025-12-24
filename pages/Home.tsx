
import React from 'react';
import { Navigation, Route, Clock, ShieldCheck, ArrowRight, Bus } from 'lucide-react';
import { Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-8 animate-bounce">
          <MapPinIcon />
          Serving Dindigul, Tamil Nadu
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Track Your Bus <br />
          <span className="text-blue-600">In Real Time</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-500 mb-10 leading-relaxed">
          Skip the wait. Accurate live tracking for all TNSTC and local routes in the Dindigul region. 
          Smart ETA, route planning, and departure alerts.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={() => onNavigate('track')}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center group"
          >
            <Navigation className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Track Live Bus
          </button>
          <button 
            onClick={() => onNavigate('routes')}
            className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 rounded-xl font-bold text-lg shadow-sm hover:border-gray-200 transition-all flex items-center justify-center"
          >
            <Route className="w-5 h-5 mr-2 text-blue-600" />
            View All Routes
          </button>
        </div>
      </section>

      {/* Quick Stats / Features */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Clock, title: 'Smart ETA', desc: 'Real-time traffic-aware arrival times for every stop.' },
              { icon: ShieldCheck, title: 'Safe Travel', desc: 'Verified driver details and bus maintenance logs.' },
              { icon: Bus, title: 'Regional Coverage', desc: 'Connecting Dindigul to Madurai, Palani, and more.' }
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-blue-50 transition-colors">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <f.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Illustration / CTA Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-16 text-white flex flex-col md:flex-row items-center justify-between overflow-hidden relative shadow-2xl">
          <div className="md:w-1/2 z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Plan your journey from anywhere in the city.</h3>
            <p className="text-blue-100 text-lg mb-8 opacity-90">
              Get instant notifications when your bus is 5 minutes away. No more missing your ride.
            </p>
            <button 
              onClick={() => onNavigate('login')}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative scale-110">
             <div className="w-64 h-64 bg-white/10 rounded-full absolute blur-3xl" />
             <Bus className="w-48 h-48 text-white opacity-20 rotate-12" />
             <Navigation className="w-24 h-24 absolute top-10 right-10 text-white/40 -rotate-45" />
          </div>
        </div>
      </section>
    </div>
  );
};

function MapPinIcon() {
  return (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export default Home;
