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
      className={`min-h-screen px-4 py-8 transition-all ${theme.transition.default} overflow-y-auto`}
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      }}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={theme.toggleTheme}
        className="fixed top-4 right-4 p-3 rounded-full flex items-center justify-center transition-all duration-300 z-50"
        style={{
          backgroundColor: theme.colors.card,
          color: theme.colors.primary,
          boxShadow: theme.colors.shadow,
          border: `1px solid ${theme.colors.border}`
        }}
      >
        {theme.isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </motion.button>

      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`font-bold mb-8 text-center sticky top-0 bg-inherit py-4 z-10`}
          style={{
            fontSize: theme.fontSize['4xl'],
            color: theme.colors.primary,
          }}
        >
          Discover News
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-4 mb-8 sticky top-20 bg-inherit py-4 z-10">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${theme.transition.default}
                ${selectedCategory === category.id
                  ? ''
                  : ''
                }
                hover:shadow-lg`}
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
              <span className="text-xl">{category.icon}</span>
              <span style={{ fontSize: theme.fontSize.base }}>{category.name}</span>
            </motion.button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div 
              className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: theme.colors.accent }}
            />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p 
              className={`text-lg mb-4`}
              style={{ color: theme.colors.secondary }}
            >
              {error}
            </p>
            <button
              onClick={() => setSelectedCategory(selectedCategory)}
              className={`px-6 py-2 rounded-full transition-all ${theme.transition.default}
                hover:shadow-lg`}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className={`rounded-2xl overflow-hidden h-full
                  transition-all ${theme.transition.default}`}
                style={{ cursor: 'pointer', backgroundColor: theme.colors.card, borderColor: theme.colors.border, borderWidth: '1px', borderRadius: theme.borderRadius.lg, boxShadow: theme.colors.shadow }}
                onClick={() => navigate(`/news-detail`, { state: { article } })}
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2
                    className={`font-semibold mb-3 line-clamp-2`}
                    style={{
                      fontSize: theme.fontSize.xl,
                      color: theme.colors.primary,
                    }}
                  >
                    {article.title}
                  </h2>
                  <p
                    className={`mb-4 line-clamp-3`}
                    style={{
                      fontSize: theme.fontSize.base,
                      color: theme.colors.secondary,
                    }}
                  >
                    {article.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-sm`}
                      style={{
                        fontSize: theme.fontSize.sm,
                        color: theme.colors.secondary,
                      }}
                    >
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 rounded-full text-sm font-medium
                        hover:shadow-lg transition-all ${theme.transition.default}`}
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