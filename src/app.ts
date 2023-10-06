import express from 'express';
import cors from 'cors';

// *** Import Routers 
// import Authentication and User Routes
import userRouter from './modules/usersAndAuthentication/routes/users';
import loginRouter from './modules/usersAndAuthentication/routes/login';


const app = express();
app.use(express.json(), cors());

// Authentication and User Routes
app.use('/api/auth/users', userRouter);
app.use('/api/auth/login', loginRouter);

app.get('/api/ping',(_req,res) => {
  res.send('Pong!');
});

export default app;