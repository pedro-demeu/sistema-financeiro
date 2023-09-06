import { Router } from 'express';
import { PostgresGetCategories } from '../repositories/get-categories/postgres-get-categories';
import { GetCategoriesController } from '../controllers/get-categories/get-categories';
import { PostgresCreateCategory } from '../repositories/create-category/postgres-create-category';
import { CreateCategoryController } from '../controllers/create-category/create-category';

export const routes = Router();

routes.get('/', async (req, res) => {
  const categoryRepository = new PostgresGetCategories();
  const getCategoriesController = new GetCategoriesController(
    categoryRepository,
  );
  const { body, statusCode } = await getCategoriesController.handle();
  res.status(statusCode).json(body);
});

routes.post('/', async (req, res) => {
  const categoryCreateRepository = new PostgresCreateCategory();
  const createCategoryController = new CreateCategoryController(
    categoryCreateRepository,
  );

  const { body, statusCode } = await createCategoryController.handle({
    body: req.body,
  });
  res.status(statusCode).send(body);
});
