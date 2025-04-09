import React from 'react'
import './App.css'
import { Car, Clock, CreditCard, MapPin, Phone, Shield } from 'lucide-react';
import {Link} from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-24">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl font-bold mb-6">Park Mate</h1>
            <p className="text-xl mb-8 max-w-2xl">
              Find and reserve parking spots in real-time. Never waste time searching for parking again.
            </p>
            <div className="flex gap-4">
              <Link to="/auth">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Get Started
              </button>
              </Link>
              <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L48 8.33333C96 16.6667 192 33.3333 288 41.6667C384 50 480 50 576 41.6667C672 33.3333 768 16.6667 864 8.33333C960 0 1056 0 1152 8.33333C1248 16.6667 1344 33.3333 1392 41.6667L1440 50V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Why Choose Park Mate?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Clock className="w-8 h-8 text-blue-600" />}
              title="Real-Time Availability"
              description="Find available parking spots instantly with live updates and occupancy status."
            />
            <FeatureCard 
              icon={<CreditCard className="w-8 h-8 text-blue-600" />}
              title="Easy Payment"
              description="Seamless payment process with multiple options including credit cards and mobile payments."
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-blue-600" />}
              title="Secure Booking"
              description="Guaranteed parking spots with secure reservation system and booking confirmation."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Step number="1" title="Find Parking" 
              description="Search for parking spots near your destination using our interactive map." 
            />
            <Step number="2" title="Reserve & Pay" 
              description="Select your spot and pay securely through our platform." 
            />
            <Step number="3" title="Park & Go" 
              description="Follow the directions to your spot and park with peace of mind." 
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Start Parking Smarter?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of happy drivers who have simplified their parking experience.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Download Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Park Mate</h3>
              <p className="text-gray-400">Making parking easier, one spot at a time.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>1-800-PARKING</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 mt-2">
                <MapPin className="w-4 h-4" />
                <span>123 Parking Street</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Services</li>
                <li>Contact</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper Components
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Step = ({ number, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default LandingPage;