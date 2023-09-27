import app from './app';
import { PORT } from './configs/config';
//const { connectToDatabase } = require('./configs/db')
import logger from './utils/logger';

const start = () => {
  //await connectToDatabase()
  app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
  });
};

start();