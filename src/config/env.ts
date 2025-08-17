export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  HTTP_LOG_LEVEL: process.env.HTTP_LOG_LEVEL || 'info',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/erp_supermarket',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key'
};
