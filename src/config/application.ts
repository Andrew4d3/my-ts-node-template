/** Extend this object to include more application metadata and configuration values */

export default {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'dev',
  jwtSecret: process.env.JWT_SECRET || '',
  dbUri: process.env.MONGO_URI || 'mongodb://localhost:27017/dev',
  logLevel: process.env.LOG_LEVEL || 'info',
};
