import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { fetchNewsByCategory, categories } from '../services/newsService';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Discover = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNewsByCategory(selectedCategory);
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [selectedCategory]);

  return (
    <div 
      className={`min-h-screen px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 transition-all ${theme.transition.default} overflow-y-auto pb-20`}
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      }}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={theme.toggleTheme}
        className="fixed top-2 sm:top-4 right-2 sm:right-4 p-2 sm:p-3 rounded-full flex items-center justify-center transition-all duration-300 z-50"
        style={{
          backgroundColor: theme.colors.card,
          color: theme.colors.primary,
          boxShadow: theme.colors.shadow,
          border: `1px solid ${theme.colors.border}`
        }}
      >
        {theme.isDarkMode ? <FaSun size={18} className="sm:w-5 sm:h-5" /> : <FaMoon size={18} className="sm:w-5 sm:h-5" />}
      </motion.button>

      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`font-bold mb-6 sm:mb-8 text-center sticky top-0 bg-inherit py-2 sm:py-4 z-10 text-xl sm:text-2xl lg:text-3xl xl:text-4xl`}
          style={{
            color: theme.colors.primary,
          }}
        >
          Discover News
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 sticky top-16 sm:top-20 bg-inherit py-2 sm:py-4 z-10 px-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full flex items-center gap-1 sm:gap-2 transition-all ${theme.transition.default}
                ${selectedCategory === category.id
                  ? ''
                  : ''
                }
                hover:shadow-lg text-xs sm:text-sm md:text-base`}
              style={{
                backgroundColor: selectedCategory === category.id
                  ? theme.colors.accent
                  : theme.colors.buttonSecondaryBg,
                color: selectedCategory === category.id
                  ? theme.colors.buttonPrimaryText
                  : theme.colors.buttonSecondaryText,
                borderRadius: theme.borderRadius.full,
                boxShadow: theme.colors.shadow,
                border: `1px solid ${selectedCategory === category.id ? theme.colors.accent : theme.colors.border}`,
              }}
            >
              <span className="text-lg sm:text-xl">{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8 sm:py-12">
            <div 
              className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: theme.colors.accent }}
            />
          </div>
        ) : error ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <p 
              className={`text-base sm:text-lg mb-4`}
              style={{ color: theme.colors.secondary }}
            >
              {error}
            </p>
            <button
              onClick={() => setSelectedCategory(selectedCategory)}
              className={`px-4 sm:px-6 py-2 rounded-full transition-all ${theme.transition.default}
                hover:shadow-lg text-sm sm:text-base`}
              style={{
                backgroundColor: theme.colors.accent,
                color: theme.colors.buttonPrimaryText,
                borderRadius: theme.borderRadius.full,
                boxShadow: theme.colors.shadow,
              }}
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2">
            {articles.map((article, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: `0 8px 20px ${theme.isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.2)'}`,
                  borderColor: theme.colors.accent
                }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
                className={`rounded-xl sm:rounded-2xl overflow-hidden h-full
                  transition-all ${theme.transition.default}`}
                style={{ cursor: 'pointer', backgroundColor: theme.colors.card, borderColor: theme.colors.border, borderWidth: '1px', borderRadius: theme.borderRadius.lg, boxShadow: theme.colors.shadow }}
                onClick={() => navigate(`/news-detail`, { state: { article } })}
              > 
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-32 sm:h-40 md:h-48 object-cover"
                  />
                )}
                <div className="p-3 sm:p-4 md:p-6">
                  <h2
                    className={`font-semibold mb-2 sm:mb-3 line-clamp-2 text-sm sm:text-base md:text-lg lg:text-xl`}
                    style={{
                      color: theme.colors.primary,
                    }}
                  >
                    {article.title}
                  </h2>
                  <p
                    className={`mb-3 sm:mb-4 line-clamp-3 text-xs sm:text-sm md:text-base`}
                    style={{
                      color: theme.colors.secondary,
                    }}
                  >
                    {article.description}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                    <span
                      className={`text-xs sm:text-sm`}
                      style={{
                        color: theme.colors.secondary,
                      }}
                    >
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium
                        hover:shadow-lg transition-all ${theme.transition.default} whitespace-nowrap`}
                      style={{
                        backgroundColor: theme.colors.accent,
                        color: theme.colors.buttonPrimaryText,
                        borderRadius: theme.borderRadius.full,
                        boxShadow: theme.colors.shadow,
                      }}
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover; 