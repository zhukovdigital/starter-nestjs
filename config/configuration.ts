import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_URL,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
  },
});
