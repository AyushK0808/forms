"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Poppins } from 'next/font/google';

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
    <div className={`min-h-screen bg-gradient-to-br from-purple-950 to-black text-white ${poppins.className}`}>
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

      <main className="container mx-auto px-4 py-12 md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        {/* Logo Image */}
        <div className="flex justify-center mb-8">
          <img 
            src="https://raw.githubusercontent.com/vinnovateit/.github/main/assets/whiteLogoViit.png" 
            alt="VIIT Logo" 
            className="w-48 h-auto"
          />
        </div>
        
        <h1 className={`text-5xl font-extrabold mb-8 text-center text-purple-300 font-poppins tracking-wider`}>
          Core Member Registration
        </h1>
        
        <form 
          onSubmit={handleSubmit} 
          className="bg-purple-950 bg-opacity-70 backdrop-filter backdrop-blur-sm shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 border-2 border-purple-600 transform transition-all duration-300 hover:scale-102"
        >
          <div className="md:grid md:grid-cols-2 md:gap-6">
            <div className="mb-4 transform transition-all duration-300 hover:translate-x-2">
              <label className="block text-purple-300 text-sm font-bold mb-2 font-poppins" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border-2 border-purple-500 bg-black bg-opacity-70 rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 font-poppins"
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
                className="shadow appearance-none border-2 border-purple-500 bg-black bg-opacity-70 rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 font-poppins"
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
                className="shadow appearance-none border-2 border-purple-500 bg-black bg-opacity-70 rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 font-poppins"
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
                className="shadow appearance-none border-2 border-purple-500 bg-black bg-opacity-70 rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 font-poppins"
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
                className="shadow appearance-none border-2 border-purple-500 bg-black bg-opacity-70 rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 font-poppins"
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
                className="shadow appearance-none border-2 border-purple-500 bg-black bg-opacity-70 rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 font-poppins"
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
              className="shadow appearance-none border-2 border-purple-500 bg-black bg-opacity-70 rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 h-24 font-poppins"
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
              className={`bg-purple-800 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transform transition-all duration-300 hover:scale-105 hover:rotate-1 relative overflow-hidden group shadow-lg shadow-purple-900/50 font-poppins tracking-wider`}
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
    </div>
  );
}