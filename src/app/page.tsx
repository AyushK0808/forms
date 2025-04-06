"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Poppins } from 'next/font/google';
import { BackgroundBeamsWithCollision } from './components/bgwithcollisions';

// Define font
const poppins = Poppins({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

// Define form data interface
interface MemberFormData {
  name: string;
  phoneNumber: string;
  email: string;
  regNo: string;
  gender: string;
  birthdate: string;
  quirkyDetail: string;
}

// Define toast notification interface
interface ToastNotification {
  show: boolean;
  message: string;
  type: string;
}

export default function Home() {
  const [formData, setFormData] = useState<MemberFormData>({
    name: '',
    phoneNumber: '',
    email: '',
    regNo: '',
    gender: '',
    birthdate: '',
    quirkyDetail: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastNotification>({ show: false, message: '', type: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hide toast after 5 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      setToast({ 
        show: true, 
        message: 'Member details saved successfully!', 
        type: 'success'
      });
      
      setFormData({
        name: '',
        phoneNumber: '',
        email: '',
        regNo: '',
        gender: '',
        birthdate: '',
        quirkyDetail: '',
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setToast({ 
        show: true, 
        message: errorMessage, 
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BackgroundBeamsWithCollision className='z-50'>
      <div className={`min-h-screen w-screen text-white ${poppins.className} relative overflow-hidden`}>
        {/* Moving gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-purple-900 to-black animate-gradientMove"></div>
        
        {/* Subtle black shade overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        {/* Dotted pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiM4QjVDRjYiIG9wYWNpdHk9IjAuMyIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
      <Head>
        <title>Core Member Registration</title>
        <meta name="description" content="Register core member details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Toast Notification */}
      {toast.show && (
        <div 
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out animate-bounce ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } z-50 max-w-md font-poppins`}
        >
          <p className="font-bold">{toast.message}</p>
        </div>
      )}

      <main className="container mx-auto px-4 py-12 md:max-w-2xl lg:max-w-4xl xl:max-w-5xl relative z-10">
        {/* Logo Image */}
        <div className="flex justify-center mb-8">
          <img 
            src="https://raw.githubusercontent.com/vinnovateit/.github/main/assets/whiteLogoViit.png" 
            alt="VIIT Logo" 
            className="w-48 h-auto"
          />
        </div>
        
        {/* Enhanced Title with Glowing Underline (no movement) */}
        <div className="relative mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-purple-500 font-poppins inline-block relative">
            Core Member Registration
          </h1>
          {/* Just glowing underline with no movement */}
          <div className="h-1 w-3/4 mx-auto mt-2 rounded-full bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400 relative overflow-hidden">
            <div className="absolute -inset-1 blur-md bg-purple-500 opacity-70"></div>
            <div className="absolute inset-0 animate-pulse-slow bg-purple-300 opacity-50"></div>
          </div>
        </div>
        
        {/* Enhanced Form with Glassmorphism */}
        <form 
          onSubmit={handleSubmit} 
          className="bg-purple-950 bg-opacity-30 backdrop-filter backdrop-blur-xl shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 border border-purple-500/30 transform transition-all duration-300 hover:shadow-purple-500/20"
        >
          <div className="md:grid md:grid-cols-2 md:gap-6">
            <div className="mb-4 transform transition-all duration-300 hover:translate-x-2">
              <label className="block text-purple-300 text-sm font-bold mb-2 font-poppins" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border border-purple-500/50 bg-purple-900/30 backdrop-blur-sm rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 font-poppins"
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>
            
            <div className="mb-4 transform transition-all duration-300 hover:translate-x-2">
              <label className="block text-purple-300 text-sm font-bold mb-2 font-poppins" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                className="shadow appearance-none border border-purple-500/50 bg-purple-900/30 backdrop-blur-sm rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 font-poppins"
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="Your phone number"
              />
            </div>
          </div>
          
          <div className="md:grid md:grid-cols-2 md:gap-6">
            <div className="mb-4 transform transition-all duration-300 hover:translate-x-2">
              <label className="block text-purple-300 text-sm font-bold mb-2 font-poppins" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border border-purple-500/50 bg-purple-900/30 backdrop-blur-sm rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 font-poppins"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your email"
              />
            </div>
            
            <div className="mb-4 transform transition-all duration-300 hover:translate-x-2">
              <label className="block text-purple-300 text-sm font-bold mb-2 font-poppins" htmlFor="regNo">
                Registration Number
              </label>
              <input
                className="shadow appearance-none border border-purple-500/50 bg-purple-900/30 backdrop-blur-sm rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 font-poppins"
                id="regNo"
                type="text"
                name="regNo"
                value={formData.regNo}
                onChange={handleChange}
                required
                placeholder="Your registration number"
              />
            </div>
          </div>
          
          <div className="md:grid md:grid-cols-2 md:gap-6">
            <div className="mb-4 transform transition-all duration-300 hover:translate-x-2">
              <label className="block text-purple-300 text-sm font-bold mb-2 font-poppins" htmlFor="gender">
                Gender
              </label>
              <select
                className="shadow appearance-none border border-purple-500/50 bg-purple-900/30 backdrop-blur-sm rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 font-poppins"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="mb-4 transform transition-all duration-300 hover:translate-x-2">
              <label className="block text-purple-300 text-sm font-bold mb-2 font-poppins" htmlFor="birthdate">
                Birth Date
              </label>
              <input
                className="shadow appearance-none border border-purple-500/50 bg-purple-900/30 backdrop-blur-sm rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 font-poppins"
                id="birthdate"
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="mb-6 transform transition-all duration-300 hover:translate-x-2">
            <label className="block text-purple-300 text-sm font-bold mb-2 font-poppins" htmlFor="quirkyDetail">
              One Quirky Detail
            </label>
            <textarea
              className="shadow appearance-none border border-purple-500/50 bg-purple-900/30 backdrop-blur-sm rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 h-24 font-poppins"
              id="quirkyDetail"
              name="quirkyDetail"
              value={formData.quirkyDetail}
              onChange={handleChange}
              required
              placeholder="Share something interesting about yourself!"
            />
          </div>
          
          <div className="flex items-center justify-center">
            <button
              className={`bg-purple-800 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transform transition-all duration-300 hover:scale-105 hover:rotate-1 relative overflow-hidden group shadow-lg shadow-purple-900/50 font-poppins tracking-wider backdrop-blur-sm`}
              type="submit"
              disabled={isSubmitting}
            >
              <span className="relative z-10 uppercase">Register</span>
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              {isSubmitting && (
                <span className="absolute right-2 animate-spin">⚡</span>
              )}
            </button>
          </div>
        </form>
      </main>

      {/* Custom animation for background and text glow */}
      <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradientMove {
          background-size: 400% 400%;
          animation: gradientMove 15s ease infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .text-shadow-purple {
          text-shadow: 0 0 8px rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
    </BackgroundBeamsWithCollision>
    
  );
}