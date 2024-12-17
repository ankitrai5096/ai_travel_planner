import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import { getPlaceDetails } from '../../constants/GlobalApi';
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API;

const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=${apiKey}`;

function InformationSection({ trip }) {
  const {
    location = "Unknown Location",
    locationImageUrl,
    hotels = [],
    itinerary = {},
  } = trip?.tripData;

  const days = itinerary;
  const [photoUrls, setPhotoUrls] = useState({
    location: null,
    hotels: {}, 
    activities: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const redirectToGoogleMaps = (address) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?q=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, '_blank');
  };

  const getPlacePhotos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const locationData = { textQuery: location };
      const locationResponse = await getPlaceDetails(locationData);
      const locationPhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        locationResponse.data.places[0].photos[0].name
      );

      const newPhotoUrls = { location: locationPhotoUrl, hotels: {}, activities: {} };

      if (hotels.length > 0) {
        for (const hotel of hotels) {
          try {
            const hotelData = { textQuery: hotel.hotelName };
            const hotelResponse = await getPlaceDetails(hotelData);
            newPhotoUrls.hotels[hotel.hotelName] = PHOTO_REF_URL.replace(
              "{NAME}",
              hotelResponse.data.places[0].photos[0].name
            );
          } catch (error) {
            console.error(`Error fetching hotel image for ${hotel.hotelName}:`, error);
          }
        }
      }

      if (days) {
        for (const dayKey in days) {
          const day = days[dayKey];
          for (const activity of day.activities) {
            try {
              const placeData = { textQuery: activity.placeName };
              const placeResponse = await getPlaceDetails(placeData);
              newPhotoUrls.activities[activity.placeName] = PHOTO_REF_URL.replace(
                "{NAME}",
                placeResponse.data.places[0].photos[0].name
              );
            } catch (error) {
              console.error(`Error fetching place image for ${activity.placeName}:`, error);
            }
          }
        }
      }

      setPhotoUrls(newPhotoUrls);
    } catch (error) {
      console.error('Error in getPlacePhotos:', error);
      setError('Failed to load images. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (trip && location) {
      getPlacePhotos();
    }
  }, [trip, location]);

  if (error) return <div style={errorStyle}>{error}</div>;

  return (
    <div style={containerStyle}>
      {/* Location Section */}
      <div style={locationStyle}>
        <img
          src={photoUrls.location || "default-location-image.jpg"}
          alt={location}
          style={locationImageStyle}
        />
        <h1 style={locationNameStyle}>{location}</h1>
        {isLoading && <div style={loadingOverlayStyle}>Loading images...</div>}
      </div>

      {/* Hotels Section */}
      <h2 style={sectionHeadingStyle}>Hotels</h2>
      {isLoading ? (
        <div style={loadingOverlayStyle}></div>
      ) : (
        <div style={sectionStyle}>
          {hotels.length > 0 ? (
            hotels.map((hotel, index) => (
              <div
                key={index}
                style={cardStyle}
                onClick={() => redirectToGoogleMaps(hotel.hotelName)}
              >
                <img
                  src={photoUrls.hotels[hotel.hotelName] || "default-hotel-image.jpg"}
                  alt={hotel.hotelName || "Hotel"}
                  style={imageStyle}
                />
                <h3 style={cardTitleStyle}>{hotel.hotelName || "Unknown Hotel"}</h3>
                <p style={cardTextStyle}>Rating: {hotel.rating || "N/A"} ⭐</p>
                <p style={cardTextStyle}>
                  Price: £{hotel.prices?.averageNightly || "N/A"}/night
                </p>
              </div>
            ))
          ) : (
            <p>No hotels available</p>
          )}
        </div>
      )}

      {/* Itinerary Section */}
      <h2 style={sectionHeadingStyle}>Places to visit</h2>
      {isLoading ? (
        <div style={loadingOverlayStyle}></div>
      ) : (
        <div style={itinerarySectionStyle}>
          {Object.keys(days).map((dayKey, index) => {
            const day = days[dayKey];
            return (
              <div key={index} style={dayCardStyle}>
                <h3 style={dayTitleStyle}>{`Day ${index + 1}: ${day.theme}`}</h3>
                <p style={bestTimeStyle}>Best Time to Visit: {day.bestTimeToVisit}</p>

                {day.activities.length > 0 ? (
                  <div style={activitiesSectionStyle}>
                    <div style={activitiesStyle}>
                      {day.activities.map((activity, activityIndex) => (
                        <div
                          key={activityIndex}
                          style={activityCardStyle}
                          onClick={() => redirectToGoogleMaps(activity.placeName)}
                        >
                          <img
                            src={
                              photoUrls.activities[activity.placeName] ||
                              "default-place-image.jpg"
                            }
                            alt={activity.placeName || "Place"}
                            style={activityImageStyle}
                          />
                          <h4 style={activityTitleStyle}>
                            {activity.placeName || "Unknown Place"}
                          </h4>
                          <p style={activityDetailsStyle}>{activity.placeDetails}</p>
                          <p style={activityTextStyle}>
                            Ticket: {activity.ticketPricing}
                          </p>
                          <p style={activityTextStyle}>
                            Travel Time: {activity.travelTimeFromHotel}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>No activities available</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      <Footer />
    </div>
  );
}

// Add styles (same as your original code above)


// Styles
const containerStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
  boxSizing: 'border-box',
};

const locationStyle = {
  position: 'relative',
  width: '100%',
  marginBottom: '20px',
};

const locationImageStyle = {
  width: '100%',
  height: '400px',
  objectFit: 'cover',
  borderRadius: '8px',
};

const locationNameStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
  fontSize: '36px',
  fontWeight: 'bold',
  textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
  textAlign: 'center',
};

const loadingOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  color: '#333',
};

const errorStyle = {
  color: 'red',
  padding: '20px',
  textAlign: 'center',
  fontSize: '18px',
};

const sectionHeadingStyle = {
  fontSize: '24px',
  marginBottom: '10px',
};

const sectionStyle = {
  display: 'flex',
  gap: '20px',
  flexWrap: 'wrap',
  marginBottom: '20px',
};

const cardStyle = {
  width: '400px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '10px',
  textAlign: 'left',
  boxSizing: 'border-box',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  cursor: 'pointer',
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '8px',
  marginBottom: '10px',
};

const cardTitleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '5px',
};

const cardTextStyle = {
  fontSize: '14px',
  marginBottom: '5px',
};

const itinerarySectionStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  flexWrap: 'wrap',
  marginBottom: '20px',
};

const dayCardStyle = {
  borderRadius: '8px',
  padding: '10px',
  textAlign: 'left',
  width: '100%',
};

const dayTitleStyle = {
  fontSize: '22px',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const bestTimeStyle = {
  fontSize: '16px',
  marginBottom: '10px',
  color: 'gray',
};

const activitiesSectionStyle = {
  marginTop: '20px',
};

const activitiesStyle = {
  display: 'flex',
  gap: '20px',
  flexWrap: 'wrap',
};

const activityCardStyle = {
  width: '400px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '10px',
  textAlign: 'left',
  boxSizing: 'border-box',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  cursor: 'pointer',
};

const activityImageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '8px',
  marginBottom: '10px',
};

const activityTitleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '5px',
};

const activityDetailsStyle = {
  fontSize: '14px',
  marginBottom: '5px',
};

const activityTextStyle = {
  fontSize: '14px',
  marginBottom: '5px',
};

export default InformationSection;