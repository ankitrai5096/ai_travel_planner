// src/components/RecommendedTrips.js
import React from 'react';

const RecommendedTrips = () => {
  const trips = [
    { name: 'Bali', budget: '$1500', image: 'https://media.cntraveler.com/photos/59cd14cb9465da68882fb4f4/master/pass/Debate_GettyImages-585587819.jpg' },
    { name: 'Paris', budget: '$3000', image: 'https://mapmygenome.in/cdn/shop/articles/How_to_Stay_Healthy_While_Traveling_-_Tips_and_Insights_for_a_Safe_Journey.webp?v=1718688910' },
    { name: 'Maldives', budget: '$2000', image: 'https://media.cntraveler.com/photos/5e74f9de2e6ca30009d1d4fa/16:9/w_2560%2Cc_limit/Argentina-GettyImages-1146497849.jpg' },
  ];

  return (
    <div style={{ padding: '20px', textAlign: 'center', opacity:0.7 }}>
      <h2 style={{ marginBottom: '20px', }}>Recommended Trips</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {trips.map((trip, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '10px',
              maxWidth: '200px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <img
              src={trip.image}
              alt={trip.name}
              style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }}
            />
            <h3>{trip.name}</h3>
            <p>Budget: {trip.budget}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedTrips;
