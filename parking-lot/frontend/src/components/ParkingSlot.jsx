import React, { useState } from 'react';
import { Clock, Info } from 'lucide-react';
import {Link} from "react-router-dom"

export default function ParkingSlotGrid() {
  // Sample data structure for slots
  // Status: 0 = available, 1 = occupied, 2 = reserved, 3 = maintenance
  const [slots, setSlots] = useState(generateInitialSlots());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [hoveredSlot, setHoveredSlot] = useState(null);

  function generateInitialSlots() {
    const times = 24; // 24 hours
    const spaces = 30; // 30 parking spaces
    const slots = [];
    
    for (let space = 0; space < spaces; space++) {
      for (let hour = 0; hour < times; hour++) {
        slots.push({
          id: `${space}-${hour}`,
          space: `P${space + 1}`,
          hour,
          status: Math.random() > 0.7 ? Math.floor(Math.random() * 4) : 0
        });
      }
    }
    return slots;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 0: return 'bg-gray-100 hover:bg-gray-200';
      case 1: return 'bg-green-500';
      case 2: return 'bg-blue-500';
      case 3: return 'bg-red-500';
      default: return 'bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0: return 'Available';
      case 1: return 'Occupied';
      case 2: return 'Reserved';
      case 3: return 'Maintenance';
      default: return 'Unknown';
    }
  };

  const handleSlotClick = (slot) => {
    if (slot.status === 0) {
      setSelectedSlot(slot);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Parking Slot Booking</h1>
          <p className="text-gray-600">Select an available slot to book</p>
        </div>
        <div className="mb-6">
        <div className="flex items-center justify-between mb-8">
    <Link 
        to="/dashboard" 
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-4 h-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
        </svg>
        Back to Dashboard
    </Link>
    <div>
        <h1 className="text-2xl font-bold text-gray-800">Parking Slot Booking</h1>
        <p className="text-gray-600">Select an available slot to book</p>
    </div>
</div>
</div>

        {/* Legend */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm">Maintenance</span>
          </div>
        </div>

        {/* Time labels */}
        <div className="flex mb-2">
          <div className="w-20"></div>
          <div className="flex-1 flex">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="flex-1 text-center text-xs text-gray-600">
                {i}:00
              </div>
            ))}
          </div>
        </div>

        {/* Slots grid */}
        <div className="relative">
          {Array.from({ length: 30 }).map((_, spaceIndex) => (
            <div key={spaceIndex} className="flex items-center">
              <div className="w-20 text-sm text-gray-600 py-1">
                Space {spaceIndex + 1}
              </div>
              <div className="flex-1 flex gap-1">
                {slots
                  .filter(slot => slot.space === `P${spaceIndex + 1}`)
                  .map((slot) => (
                    <div
                      key={slot.id}
                      className={`
                        flex-1 aspect-square rounded
                        ${getStatusColor(slot.status)}
                        ${slot.status === 0 ? 'cursor-pointer' : 'cursor-not-allowed'}
                        transition-colors duration-200
                      `}
                      onClick={() => handleSlotClick(slot)}
                      onMouseEnter={() => setHoveredSlot(slot)}
                      onMouseLeave={() => setHoveredSlot(null)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Hover tooltip */}
        {hoveredSlot && (
          <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10">
            <div className="text-sm font-medium">Space {hoveredSlot.space}</div>
            <div className="text-sm text-gray-600">Time: {hoveredSlot.hour}:00</div>
            <div className="text-sm text-gray-600">Status: {getStatusText(hoveredSlot.status)}</div>
          </div>
        )}

        {/* Booking modal */}
        {selectedSlot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Book Parking Slot</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Space</label>
                  <div className="mt-1 text-gray-900">{selectedSlot.space}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <div className="mt-1 text-gray-900">{selectedSlot.hour}:00</div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                    onClick={() => setSelectedSlot(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded"
                    onClick={() => {
                      // Handle booking logic here
                      const newSlots = slots.map(slot =>
                        slot.id === selectedSlot.id ? { ...slot, status: 2 } : slot
                      );
                      setSlots(newSlots);
                      setSelectedSlot(null);
                    }}
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}