const config = {
    port: process.env.PORT,
    mongoConnString: process.env.MONGODB_CONNECTION_STRING || '',
    secretKey: process.env.SECRET_KEY,
    corsOptions: { origin: '*' },
  };
  export default config;