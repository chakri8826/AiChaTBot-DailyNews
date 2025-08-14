import axios from 'axios';
import { ENV_VARS } from '../config/ENV_VARS.js';
const NEWS_API_KEY = ENV_VARS.NEWS_API_KEY;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';


const validCategories = ['general', 'science', 'entertainment', 'sports', 'business', 'technology', 'health'];

export const getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
      params: {
        country: 'us',
        category: category,
        apiKey: NEWS_API_KEY
      }
    });
    console.log("News API Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error('News API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};
