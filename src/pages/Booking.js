// src/pages/Booking.js
import React from 'react';
import RecommendedTrips from '../components/RecommendedTrips';
import BookingForm from '../components/BookingForm';

const Booking = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <BookingForm />
      {/* <RecommendedTrips /> */}
    </div>
  );
};

export default Booking;
