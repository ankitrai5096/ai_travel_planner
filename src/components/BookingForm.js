import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AI_PROMPT, budgetList, optionsList } from '../constants/options';
import './BookingForm.css';
import { chatSession } from '../utils/AiIntegration';
import { FireDB } from '../utils/Config';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API;
  const navigate = useNavigate(); 

  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const auth = getAuth();
    // Check the user's authentication status
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null); 
        navigate('/signin'); 
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (name, value) => {
    if (name === 'numOfDays') {
      value = parseInt(value, 10);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const { numOfDays, budget, location, traveler } = formData;

    if (!numOfDays || !budget || !location || !traveler) {
      alert('⚠️ Please fill in all the required fields to continue!');
      return;
    }

    if (numOfDays > 10) {
      alert('⏳ Number of days must be 10 or less!');
      return;
    }

    console.log('Form submitted successfully:', formData);

    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", formData?.location?.label)
      .replace("{totalDays}", formData?.numOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.numOfDays);
      console.log(FINAL_PROMPT)

    setLoading(true); 

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);

      // Check if the result has a function in the 'text' field and invoke it
      if (result && result.response && typeof result.response.text === 'function') {
        const text = result.response.text();
        saveAiTrips(result.response.text());
        console.log("Gmini API Response Text:", text);
      } else {
        console.warn("Unexpected response format or no text function found:", result);
      }
    } catch (error) {
      console.error("Error occurred while fetching the response:", error);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  const saveAiTrips = async (tripData) => {
    console.log("Trip data before parsing:", tripData);  // Log the raw data
    const docId = Date.now().toString();
    try {
      const parsedData = JSON.parse(tripData);
      await setDoc(doc(FireDB, "Trips", docId), {
        userSelection: formData,
        tripData: parsedData,
        userEmail: user?.email,
        id: docId,
      });
      navigate('/viewtrip/' + docId);
    } catch (error) {
      console.error("Failed to parse trip data:", error);
    }
  };

  // Only render the BookingForm if the user is logged in
  if (!user) {
    return <div>Loading...</div>; // You can show a loading spinner or redirect here
  }

  return (
    <div className="booking-form-container">
      <h2 className="form-title">✈️ Ready to Plan Your Perfect Trip?</h2>
      <p className="form-description">
        🌍 Share your preferences, and we’ll craft an unforgettable journey for you!
      </p>

      {/* Destination Input */}
      <div className="input-section">
        <h3>📍 Where do you want to go?</h3>
        <GooglePlacesAutocomplete
          apiKey={apiKey}
          selectProps={{
            place,
            onChange: (v) => {
              setPlace(v);
              handleChange('location', v);
            },
          }}
        />
      </div>

      {/* Number of People */}
      <div className="input-section">
        <h3>👥 How many days do want this journey to be?</h3>
        <input
          type="number"
          name="people"
          placeholder="Ex. 3"
          onChange={(e) => handleChange('numOfDays', e.target.value)}
          className="input-box"
        />
      </div>

      {/* Budget Options */}
      <div className="input-section">
        <h3>💰 What’s your budget?</h3>
        <div className="card-container">
          {budgetList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleChange('budget', item.title)}
              className={`card ${formData.budget === item.title ? 'selected' : ''}`}
            >
              <div className="card-icon">{item.icon}</div>
              <div className="card-title">{item.title}</div>
              <div className="card-description">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="input-section">
        <h3>🌟 What kind of experience are you looking for?</h3>
        <div className="card-container">
          {optionsList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleChange('traveler', item.people)}
              className={`card ${formData.traveler === item.people ? 'selected' : ''}`}
            >
              <div className="card-icon">{item.icon}</div>
              <div className="card-title">{item.title}</div>
              <div className="card-description">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="submit-section">
        <button onClick={handleSubmit} className="submit-button">
        Plan My Trip
        </button>
      </div>

      {/* Show loading indicator when submitting */}
      {loading && (
        <div className="loader">
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
