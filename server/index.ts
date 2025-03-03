import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import xmlRouter from './src/routers/xmlRouter';
import { logger } from '@server/utils/logger';
import 'dotenv/config';


const PORT = process.env.PORT ?? 8080;

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(xmlRouter);

// Startup
console.log(`Starting server...`);
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
});
