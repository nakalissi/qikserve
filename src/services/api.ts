import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  }, 
});

export const fetchRestaurantDetails = async (restaurantId: string) => {
  try {
    const response = await api.get(`/challenge/venue/${restaurantId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchMenuDetails = async () => {
  try {
    const response = await api.get('/challenge/menu');
    return response.data.sections;
  } catch (error: any) {
    throw new Error(error);
  }
};
