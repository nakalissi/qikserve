import axios from 'axios';

export const fetchRestaurantDetails = async (restaurantId: string) => {
  try {
    const response = await axios.get(`/challenge/venue/${restaurantId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchMenuDetails = async () => {
  try {
    const response = await axios.get('/challenge/menu');
    return response.data.sections;
  } catch (error: any) {
    throw new Error(error);
  }
};
