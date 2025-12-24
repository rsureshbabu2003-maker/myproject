
import React, { useState } from 'react';
import { Page } from './types';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Routes from './pages/Routes';
import Tracker from './pages/Tracker';
import Profile from './pages/Profile';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  const handleNavigate = (page: Page, routeId?: string) => {
    setCurrentPage(page);
    if (routeId) {
      setSelectedRouteId(routeId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'routes':
        return <Routes onNavigate={handleNavigate} />;
      case 'track':
        return <Tracker selectedRouteId={selectedRouteId} />;
      case 'profile':
        return <Profile onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {/* Page Container */}
        <div className="animate-in fade-in duration-500">
          {renderPage()}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.88 15.66c-1.35.43-2.58.46-3.69-.17-1.11-.63-1.63-1.63-1.63-2.83 0-1.12.44-1.91 1.33-2.39.89-.48 2.05-.63 3.49-.45v-.42c0-.52-.16-.94-.48-1.26-.32-.32-.74-.48-1.26-.48-.52 0-.94.16-1.26.48s-.48.74-.48 1.26h-1.64c0-1.12.44-1.91 1.33-2.39.89-.48 2.05-.63 3.49-.45 1.12 0 1.91.44 2.39 1.33.48.89.63 2.05.45 3.49v4.21c0 .52.16.94.48 1.26s.74.48 1.26.48h1.64c0 1.12-.44 1.91-1.33 2.39z"/>
              </svg>
            </div>
            <h4 className="text-gray-900 font-black tracking-tight">Dindigul Live Tracker</h4>
          </div>
          <p className="text-sm text-gray-500 mb-8">
            The standard for smart transportation in Tamil Nadu. <br />
            &copy; 2024 Dindigul Transport Authority. All Rights Reserved.
          </p>
          <div className="flex justify-center space-x-6 text-xs font-bold text-blue-600 uppercase tracking-widest">
            <button className="hover:text-blue-700">Privacy Policy</button>
            <button className="hover:text-blue-700">Terms of Use</button>
            <button className="hover:text-blue-700">Help Center</button>
          </div>
        </div>
      </footer>

      {/* Persistent Mobile Action (Quick Access) */}
      {currentPage !== 'track' && (
        <div className="md:hidden fixed bottom-6 right-6 z-40">
           <button 
            onClick={() => handleNavigate('track')}
            className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce"
           >
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
             </svg>
           </button>
        </div>
      )}
    </div>
  );
};

export default App;
