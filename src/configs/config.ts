import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const DATABASE_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DATABASE_URI
  : process.env.DATABASE_URI;

const SECRET = 'secret*secret*secret';

export  {
  DATABASE_URI,
  PORT,
  SECRET
};