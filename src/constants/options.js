const optionsList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'A sole travels in exploration',
      icon: '👤',
      people: '1',
    },
    {
      id: 2,
      title: 'A Couple',
      desc: 'Two travels in tandem',
      icon: '🥂',
      people: '2 People',
    },
    {
      id: 3,
      title: 'Family',
      desc: 'A group of fun-loving adventurers',
      icon: '👨‍👩‍👧‍👦',
      people: '3 to 5 People',
    },
    {
      id: 4,
      title: 'Friends',
      desc: 'Exploring with your closest friends',
      icon: '🧑‍🤝‍🧑',
      people: '4 to 8 People',
    },
  ];
  
  const budgetList = [
    {
      id: 1,
      title: 'Budget Friendly',
      desc: 'Affordable and cost-conscious options',
      icon: '💸',
      priceRange: 'Low',
    },
    {
      id: 2,
      title: 'Standard',
      desc: 'Balanced between cost and comfort',
      icon: '💵',
      priceRange: 'Moderate',
    },
    {
      id: 3,
      title: 'Premium',
      desc: 'High-end experiences with extra perks',
      icon: '💎',
      priceRange: 'High',
    },
    {
      id: 4,
      title: 'Luxury',
      desc: 'Exclusive and top-tier luxury experience',
      icon: '🏰',
      priceRange: 'Very High',
    },
  ];

  export const AI_PROMPT = "Generate Travel Plan for Location: {location}, for {totalDays} days for {traveler} with a {budget}? Give me a Hotels options list with HotelName, Hotel address, Prices, Hotel image url, geo coordinates, rating, descriptions and suggested itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, Ticket Pricing, Time to travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format."
  
  export { optionsList, budgetList };
  