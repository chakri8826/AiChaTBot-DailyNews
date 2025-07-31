import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const QueryList = ({ queries }) => {
  return (
    <div className="space-y-6 mb-8">
      {queries.map((query, index) => (
        <motion.div
          key={query.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-dark-card rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
        >
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {query.query}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(query.timestamp).toLocaleString()}
              </p>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{query.response}</ReactMarkdown>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default QueryList; 