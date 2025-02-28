import httpClient from './httpClient';
import axios from 'axios';
import menu from './menu.json';
import venue from './venue.json';

export const fetchRestaurantDetails = async () => {
  const response = await axios.get('/challenge/venue/9');
  return response.data;
};

export const fetchMenuDetails = async () => {
  const response = await axios.get('/challenge/menu');
  return response.data.sections;
};
