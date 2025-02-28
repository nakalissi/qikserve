import axios from 'axios';

export const fetchRestaurantDetails = async () => {
  const response = await axios.get('/challenge/venue/9');
  return response.data;
};

export const fetchMenuDetails = async () => {
  const response = await axios.get('/challenge/menu');
  return response.data.sections;
};
