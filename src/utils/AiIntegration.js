import { GoogleGenerativeAI } from "@google/generative-ai";

  
  const apiKey = process.env.REACT_APP_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget? ...",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `Okay, here's a budget-friendly 3-day Las Vegas itinerary for a couple, along with hotel options, all in JSON format. 
            {
              \"location\": \"Las Vegas, Nevada\",
              \"duration\": \"3 Days\",
              \"budget\": \"Cheap\",
              \"travelers\": \"Couple\",
              \"currency\": \"USD\",
              \"hotels\": [
                {
                  \"hotelName\": \"Circus Circus Hotel, Casino & Theme Park\",
                  \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",
                  \"prices\": {
                    \"averageNightly\": 50,
                    \"range\": \"40-80\"
                  },
                  \"hotelImageUrl\": \"https://media-cdn.tripadvisor.com/media/photo-s/19/e5/a2/6f/circus-circus-hotel-casino.jpg\",
                  \"geoCoordinates\": {
                    \"latitude\": 36.1392,
                    \"longitude\": -115.1668
                  },
                  \"rating\": 3.5,
                  \"description\": \"Offers budget-friendly rooms, a casino, and the Adventuredome theme park...\"
                }
              ],
              \"itinerary\": {
                \"day1\": {
                  \"theme\": \"Exploring the Strip and Downtown\",
                  \"bestTimeToVisit\": \"Morning/Afternoon for outdoor activities, Evening for free shows\",
                  \"activities\": [
                    {
                      \"placeName\": \"Welcome to Fabulous Las Vegas Sign\",
                      \"placeDetails\": \"Iconic sign for photos. Free to visit.\",
                      \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Las_Vegas_Sign_edit.jpg/800px-Las_Vegas_Sign_edit.jpg\",
                      \"geoCoordinates\": {
                        \"latitude\": 36.0827,
                        \"longitude\": -115.1726
                      },
                      \"ticketPricing\": \"Free\",
                      \"travelTimeFromHotel\": \"15-20 min drive or taxi from the Strip Hotels\"
                    }
                  ]
                }
              }
            }`
          },
        ],
      },
    ],
  });
  
  
  

  
