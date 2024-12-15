import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FireDB } from '../utils/Config';
import InformationSection from '../components/trip/InformationSection';

function ViewTrips() {
  const [trip, setTrip] = useState(null); // Default state is null
  const { tripId } = useParams();

  const getTripsData = async () => {
    try {
      const docRef = doc(FireDB, 'Trips', tripId);
      const docsnap = await getDoc(docRef);
      if (docsnap.exists()) {

        setTrip(docsnap.data());
      } else {
        console.error("No data found for this trip ID");
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
    }
  };

  useEffect(() => {
    if (tripId) {
      getTripsData();
    }
  }, [tripId]);

  return (
    <div>
      {trip ? (
        <InformationSection trip={trip} />
      ) : (
        <div>Loading trip details...</div>
      )}
    </div>
  );
}

export default ViewTrips;
