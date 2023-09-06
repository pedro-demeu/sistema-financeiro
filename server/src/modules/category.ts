import { Router } from 'express';
import { PostgresGetCategories } from '../repositories/get-categories/postgres-get-categories';
import { GetCategoriesController } from '../controllers/get-categories/get-categories';

export const routes = Router();

routes.get('/', async (req, res) => {
  const categoryRepository = new PostgresGetCategories();
  const getCategoriesController = new GetCategoriesController(
    categoryRepository,
  );

  const { body, statusCode } = await getCategoriesController.handle();

  res.status(statusCode).json(body);
});
