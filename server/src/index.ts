import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './shared/db/db';
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import { requestLogger } from './shared/middleware/logger';
import examRoutes from './modules/exam/routes';
//For env File 
dotenv.config();

import authRoutes from './modules/user/routes';


const app = express();
const port = process.env.PORT || 8000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use('/api/auth', authRoutes);
app.use('/api/exam', examRoutes);

app.get(/.*/, (req, res) => {
  res.status(404).send('Page not  found');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
 testConnection();
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  // Optionally exit process
  process.exit(1);
});


process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Optionally exit process
  process.exit(1);
});

