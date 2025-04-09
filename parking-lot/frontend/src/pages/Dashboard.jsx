import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, ParkingCircle, Clock, ArrowUpRight, ArrowDownRight, ChevronRight, LogOut } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

// Sample data for the chart
const parkingData = [
  { name: '00:00', vehicles: 12 },
  { name: '04:00', vehicles: 8 },
  { name: '08:00', vehicles: 25 },
  { name: '12:00', vehicles: 35 },
  { name: '16:00', vehicles: 30 },
  { name: '20:00', vehicles: 20 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [isVehicleFormOpen, setIsVehicleFormOpen] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [error, setError] = useState('');

  const stats = {
    totalVehicles: 150,
    vehicleChange: 12,
    totalSlots: 200,
    occupiedSlots: 145,
    availableTimeSlots: 24,
    popularHours: '9 AM - 5 PM',
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    localStorage.removeItem('userId'); // Clear the user ID
    navigate('/'); // Redirect to login page
  };

  const handleAddVehicle = () => {
    setIsVehicleFormOpen(true); // Open the vehicle form
  };

  const handleVehicleFormSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!registrationId || !vehicleType || !vehicleColor) {
      setError('Please fill in all fields');
      return;
    }

    // Submit logic (you can replace this with an API call)
    console.log('Vehicle Registered:', { registrationId, vehicleType, vehicleColor });

    // Reset form and close modal
    setRegistrationId('');
    setVehicleType('');
    setVehicleColor('');
    setIsVehicleFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Book Parking Button and Logout Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h2>
          <p className="text-gray-600">Overview of parking system statistics</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleAddVehicle}
            className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Add Your Vehicle
            <Car className="h-4 w-4" />
          </button>
          <Link to="/parkingSlots">
            <button className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
              Select Parking Slot
              <ChevronRight className="h-4 w-4" />
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Vehicle Registration Form Modal */}
      {isVehicleFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Register Your Vehicle</h3>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            <form onSubmit={handleVehicleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registration ID</label>
                <input
                  type="text"
                  placeholder="Enter Registration ID"
                  value={registrationId}
                  onChange={(e) => setRegistrationId(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Color</label>
                <input
                  type="text"
                  placeholder="Enter Vehicle Color"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsVehicleFormOpen(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rest of the Dashboard Content */}
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Registered Vehicles Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">
              Registered Vehicles
            </h3>
            <Car className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{stats.totalVehicles}</div>
              <div className="flex items-center text-sm">
                {stats.vehicleChange > 0 ? (
                  <>
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">+{stats.vehicleChange} new today</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                    <span className="text-red-500">{stats.vehicleChange} today</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Parking Slots Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">
              Parking Slots Status
            </h3>
            <ParkingCircle className="h-4 w-4 text-gray-600" />
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{stats.occupiedSlots}/{stats.totalSlots}</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${(stats.occupiedSlots / stats.totalSlots) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{stats.totalSlots - stats.occupiedSlots} Available</span>
              <span>{stats.occupiedSlots} Occupied</span>
            </div>
          </div>
        </div>

        {/* Time Slots Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">
              Time Slots Overview
            </h3>
            <Clock className="h-4 w-4 text-gray-600" />
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{stats.availableTimeSlots} Hours</div>
            <div className="text-sm text-gray-600">
              Peak Hours: {stats.popularHours}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Parking Usage Throughout the Day</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={parkingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="vehicles" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ fill: '#2563eb' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  index % 2 === 0 ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {index % 2 === 0 ? (
                    <Car className="h-4 w-4 text-green-600" />
                  ) : (
                    <ParkingCircle className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {index % 2 === 0 ? 'New Vehicle Registered' : 'Parking Slot Updated'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {index % 2 === 0 ? 'Vehicle XYZ-123 registered' : 'Slot A1 status changed to occupied'}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 min ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}