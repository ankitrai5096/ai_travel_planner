// src/components/BookingForm.js
import React, { useState } from 'react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    likingCountry: '',
    people: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Booking Submitted!');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', marginTop: '40px' }}>
      <h2 style={{ marginBottom: '20px' }}>Book Your Trip</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          maxWidth: '300px',
          margin: '0 auto',
        }}
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            width: '50vw',
          }}
        />
        <input
          type="text"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Your Budget"
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            width: '50vw',
          }}
        />
        <input
          type="text"
          name="likingCountry"
          value={formData.likingCountry}
          onChange={handleChange}
          placeholder="Preferred Country"
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            width: '50vw',
          }}
        />
        <input
          type="number"
          name="people"
          value={formData.people}
          onChange={handleChange}
          placeholder="Number of People"
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            width: '50vw',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#1e90ff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
