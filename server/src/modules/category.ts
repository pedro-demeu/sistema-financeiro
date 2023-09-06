import { Router } from 'express';
import { PostgresGetCategories } from '../repositories/category/get-categories/postgres-get-categories';
import { GetCategoriesController } from '../controllers/category/get-categories/get-categories';
import { PostgresCreateCategory } from '../repositories/category/create-category/postgres-create-category';
import { CreateCategoryController } from '../controllers/category/create-category/create-category';
import { PostgresUpdateCategoryRepository } from '../repositories/category/update-category/postgres-update-category';
import { UpdateCategoryController } from '../controllers/category/update-category/update-category';
import { PostgresDeleteCategoryRepository } from '../repositories/category/delete-category/postgres-delete-category';
import { DeleteCategoryController } from '../controllers/category/delete-category/delete-category';

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

routes.put('/:id', async (req, res) => {
  const categoryUpdateRepository = new PostgresUpdateCategoryRepository();
  const updateCategoryController = new UpdateCategoryController(
    categoryUpdateRepository,
  );

  const { body, statusCode } = await updateCategoryController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

routes.delete('/:id', async (req, res) => {
  const categoryDeleteRepository = new PostgresDeleteCategoryRepository();
  const deleteCategoryController = new DeleteCategoryController(
    categoryDeleteRepository,
  );

  const { body, statusCode } = await deleteCategoryController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});
