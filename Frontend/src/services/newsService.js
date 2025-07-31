const BASE_URL = 'http://localhost:5000/api/news';

export const fetchNewsByCategory = async (category) => {
  try {
    console.log('Fetching news for category:', category);

    const response = await fetch(`${BASE_URL}/category/${category}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to fetch news: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.articles || !Array.isArray(data.articles)) {
      throw new Error('Invalid response format from server');
    }

    return data.articles;
  } catch (error) {
    console.error('News API Error:', error);
    throw error;
  }
};

export const categories = [
  { id: 'general', name: 'Top News', icon: '📰' },
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'business', name: 'Finance', icon: '💰' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'health', name: 'Health', icon: '🏥' }
]; 