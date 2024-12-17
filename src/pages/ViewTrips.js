import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FireDB } from '../utils/Config';
import InformationSection from '../components/trip/InformationSection';
import './ViewTrips.css';

function ViewTrips() {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const { tripId } = useParams();

  const getTripsData = async () => {
    try {
      const docRef = doc(FireDB, 'Trips', tripId);
      const docsnap = await getDoc(docRef);
      if (docsnap.exists()) {
        setTrip(docsnap.data());
      } else {
        console.error('No data found for this trip ID');
      }
    } catch (error) {
      console.error('Error fetching trip data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tripId) {
      getTripsData();
    }
  }, [tripId]);

  return (
    <div className="view-trips-container">
      {loading ? (
        <div className="loader-container">
          <div className="circular-loader"></div>
        </div>
      ) : (
        <InformationSection trip={trip} />
      )}
    </div>
  );
}

export default ViewTrips;
