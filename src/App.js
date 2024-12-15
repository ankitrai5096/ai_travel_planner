// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage'; // Adjust the path based on your file structure
import Booking from './pages/Booking';
import SignInPage from './components/SignInPage';
import ViewTrips from './pages/ViewTrips';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/viewtrip/:tripId" element={<ViewTrips />} />
      </Routes>
    </Router>
  );
};

export default App;
