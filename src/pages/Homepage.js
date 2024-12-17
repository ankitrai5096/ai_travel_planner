import React from 'react';
import Navbar from '../components/Navbar'; // Your existing Navbar component
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import video from '../assets/herovideo.mp4'
import video2 from '../assets/herovideo2.webm'

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f4f4f4' }}>
      {/* Use your Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header style={{ textAlign: 'center', padding: '100px 20px', backgroundColor: '#ffffff' }}>
        <h1>Plan Your Dream Journey with AI</h1>
        <p style={{ fontSize: '18px', color: '#555', paddingBottom:'10px' }}>Effortlessly design your perfect trip with our intelligent travel planner.</p>

        {/* Book Now Button */}
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#ffffff' }}>
          <button
            style={{
              padding: '10px 30px',
              backgroundColor: '#1e90ff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/Booking')}
          >
            Book Now
          </button>
        </div>

        <video
          autoPlay
          muted
          src={video}
          style={{ width: '100%', maxWidth: '600px', borderRadius: '10px', margin: '20px 20px' }}
        >
          <track kind="captions" src="captions_en.vtt" />
        </video>
        <video
          autoPlay
          muted
          src={video2}
          style={{ width: '100%', maxWidth: '600px', borderRadius: '10px', margin: '20px 20px' }}
        >
          <track kind="captions" src="captions_en.vtt" />
        </video>
      </header>

      {/* Features Section */}
      <section id="features" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px' }}>Why Choose Us</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', maxWidth: '300px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <img
              src="https://t4.ftcdn.net/jpg/00/65/48/25/360_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg"
              alt="Personalized Plans"
              style={{ width: '100%', borderRadius: '10px' }}
            />
            <h3>Personalized Plans</h3>
            <p style={{ color: '#555' }}>Get custom itineraries tailored to your preferences.</p>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', maxWidth: '300px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <img
              src="https://www.gstatic.com/webp/gallery/2.jpg"
              alt="Explore Destinations"
              style={{ width: '100%', borderRadius: '10px' }}
            />
            <h3>Explore Destinations</h3>
            <p style={{ color: '#555' }}>Discover hidden gems and popular hotspots with ease.</p>
          </div>
          <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', maxWidth: '300px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <img
              src="https://www.gstatic.com/webp/gallery/4.jpg"
              alt="AI-Powered Suggestions"
              style={{ width: '100%', borderRadius: '10px' }}
            />
            <h3>AI-Powered Suggestions</h3>
            <p style={{ color: '#555' }}>Get recommendations that adapt to your preferences.</p>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer style={{ backgroundColor: '#1e90ff', color: 'white', textAlign: 'center', padding: '10px 20px', marginTop: '20px' }}>
        <p>&copy; {new Date().getFullYear()} AI Travel Planner. All rights reserved.</p>
      </footer>
      <Footer />
    </div>
  );
};

export default Homepage;
