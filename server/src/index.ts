import 'reflect-metadata';
import express from 'express';
import { config } from 'dotenv';
import { routes as CategoryRoutes } from './modules/category';
import { routes as FinancesRoutes } from './modules/finances';
import { routes as CronogramsRoutes } from './modules/cronogram';

config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

app.use('/v1/api/category', CategoryRoutes);
app.use('/v1/api/finances', FinancesRoutes);
app.use('/v1/api/cronograms', CronogramsRoutes);
