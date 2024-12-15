
import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API;

const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask': 'places.photos,places.displayName,places.id'  // Changed to string
  }
};

export const getPlaceDetails = (data) => axios.post(BASE_URL, data, config);