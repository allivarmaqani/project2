// src/service/randomNumberApi.js
import axios from 'axios';

export const getRandomNumber = async (min, max) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/random-number?min=${min}&max=${max}`);
    return response;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
