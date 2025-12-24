
import React, { useState } from 'react';
import { Mail, Lock, LogIn, Shield, User, ArrowRight } from 'lucide-react';
import { Page } from '../types';

interface LoginProps {
  onNavigate: (page: Page) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const [type, setType] = useState<'passenger' | 'driver'>('passenger');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    onNavigate('profile');
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg rotate-3">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Access your tracker account</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-gray-50 rounded-xl mb-8">
          <button 
            onClick={() => setType('passenger')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center ${
              type === 'passenger' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            Passenger
          </button>
          <button 
            onClick={() => setType('driver')}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center ${
              type === 'driver' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Shield className="w-4 h-4 mr-2" />
            Driver
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg">{error}</p>}
          
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-2">
            <label className="flex items-center cursor-pointer text-gray-500 font-medium">
              <input type="checkbox" className="mr-2 accent-blue-600" />
              Remember me
            </label>
            <button type="button" className="text-blue-600 font-bold hover:underline">Forgot Password?</button>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95 flex items-center justify-center"
          >
            Sign In
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-50 pt-6">
          <p className="text-sm text-gray-500 font-medium">
            New to Tracker? <button className="text-blue-600 font-bold hover:underline">Create Account</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
