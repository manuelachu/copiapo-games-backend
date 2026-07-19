import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import gameRoutes from './routes/gameRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);

app.get('/api/status', (req, res) => {
  res.status(200).json({ status: "Online", message: "Bienvenidos a Copiapó Games Store API" });
});

export default app;