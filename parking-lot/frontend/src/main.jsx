
import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from "./pages/Auth.jsx"
import Dashboard from './pages/Dashboard.jsx';
import ParkingSlotGrid from './components/ParkingSlot.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/" element={<App />} />
        <Route path="/parkingSlots" element={<ParkingSlotGrid/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
