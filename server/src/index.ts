import express from 'express';
import dotenv from 'dotenv';
import connectDB from './shared/db/mongo';

//For env File 
dotenv.config();


import authRoutes from './modules/auth/routes';

const app = express();
const port = process.env.PORT || 8000;


app.use(express.json());
app.use('/api/auth', authRoutes);

app.get(/.*/, (req, res) => {
  res.status(404).send('Page not  found');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
  connectDB()
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

