
import React from 'react';
import { User, Bell, Map, Settings, LogOut, ChevronRight, Bookmark } from 'lucide-react';
import { Page } from '../types';

interface ProfileProps {
  onNavigate: (page: Page) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-8 text-center text-white relative">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/30">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Arun Kumar</h2>
          <p className="text-blue-100 text-sm mt-1">Passenger • Dindigul Member</p>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 space-y-6">
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-2">Saved Content</h3>
            <div className="space-y-2">
              {[
                { icon: Bookmark, label: 'Favorite Routes', count: '3 Routes' },
                { icon: Map, label: 'Recent Trips', count: '12 Trips' }
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-xl mr-4 group-hover:bg-blue-50 transition-colors">
                      <item.icon className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                    </div>
                    <span className="font-bold text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <span className="text-xs font-medium mr-2">{item.count}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-2">Preferences</h3>
            <div className="space-y-2">
              {[
                { icon: Bell, label: 'Notifications', value: 'Enabled' },
                { icon: Settings, label: 'App Settings', value: '' }
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-xl mr-4">
                      <item.icon className="w-5 h-5 text-gray-500" />
                    </div>
                    <span className="font-bold text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    {item.value && <span className="text-xs font-medium mr-2 text-green-600 font-bold">{item.value}</span>}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </section>

          <div className="pt-4 border-t border-gray-50">
            <button 
              onClick={() => onNavigate('home')}
              className="w-full flex items-center p-4 text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
