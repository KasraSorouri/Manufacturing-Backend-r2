import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json(), cors());

app.get('/api/ping',(_req,res) => {
  res.send('Pong!');
});

export default app;