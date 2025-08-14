import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const NewsDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const article = location.state?.article;

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 lg:p-8 text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Article not found</h1>
          <button 
            onClick={() => navigate('/discover')}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Go to Discover
          </button>
        </div>
      </div>
    );
  }

  const formattedDate = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'N/A';
  const readingTime = Math.ceil((article.content?.split(' ').length || 0) / 200);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col p-3 sm:p-4 md:p-6 lg:p-8 pb-20 overflow-y-auto custom-scrollbar">
      <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col">
        {/* Back button */}
        <button
          onClick={() => navigate('/discover')}
          className="mb-4 sm:mb-6 px-3 sm:px-4 py-2 bg-gray-800/80 backdrop-blur-sm text-white rounded-lg hover:bg-gray-700/80 transition-all duration-300 flex items-center gap-2 w-fit text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Discover
        </button>

        {/* Article content */}
        <article className="bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl flex flex-col flex-grow">
          {(article.urlToImage || article.image) && (
            <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px]">
              <img
                src={article.urlToImage || article.image}
                alt={article.title}
                className="w-full h-full object-cover rounded-t-xl sm:rounded-t-2xl"
              />
            </div>
          )}
          
          <div className="p-4 sm:p-6 md:p-8 flex-grow overflow-y-auto custom-scrollbar min-h-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
              {article.title}
            </h1>
            
            {article.url && (
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 mb-4 sm:mb-6 text-center text-sm sm:text-base w-full sm:w-auto"
              >
                Read Full Article at Original Source
              </a>
            )}

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-gray-400 mb-6 sm:mb-8">
              {article.author && (
                <span className="flex items-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {article.author}
                </span>
              )}
              {article.source && (
                <span className="flex items-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  {typeof article.source === 'object' ? article.source.name : article.source}
                </span>
              )}
              {formattedDate && (
                <span className="flex items-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formattedDate}
                </span>
              )}
              {readingTime > 0 && (
                <span className="flex items-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {readingTime} min read
                </span>
              )}
            </div>

            <div className="prose prose-invert max-w-none text-sm sm:text-base lg:text-lg leading-relaxed">
              {article.content ? (
                <div className="space-y-3 sm:space-y-4">
                  {article.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-300">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic">No content available for this article.</p>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsDetailPage; 