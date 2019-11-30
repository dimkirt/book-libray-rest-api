module.exports = {
  sql: {
    user: process.env.MS_SQL_USER,
    password: process.env.MS_SQL_PASSWORD,
    server: process.env.MS_SQL_SERVER,
    database: process.env.MS_SQL_DATABASE,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: true,
    },
  },
  mongo: {
    uri: process.env.MONGO_URI,
  },
  app: {
    db: 'mongo',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4000,
  },
};
