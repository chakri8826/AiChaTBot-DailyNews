import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/perplexity',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  NEWS_API_KEY: process.env.NEWS_API_KEY,
};
