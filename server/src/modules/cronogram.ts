import { Router } from 'express';
import { PostgresGetCronograms } from '../repositories/cronogram/get-cronograms/postgres-get-cronograms';
import { GetCronogramController } from '../controllers/cronograms/get-cronograms/get-cronograms';
import { PostgresCreateCronogram } from '../repositories/cronogram/create-cronogram/postgres-create-cronogram';
import { CreateCronogramController } from '../controllers/cronograms/create-cronogram/create-cronogram';
import { PostgresGetDetailCronogram } from '../repositories/cronogram/get-detail-cronogram/postgres-get-detail-cronogram';
import { GetDetailCronogramController } from '../controllers/cronograms/get-detail-cronogram/get-detail-cronogram';
import { PostgresUpdateCronogramRepository } from '../repositories/cronogram/update-cronogram/postgres-update-cronogram';
import { UpdateCategoryController } from './../controllers/category/update-category/update-category';
import { UpdateCronogramController } from '../controllers/cronograms/update-cronogram/update-cronogram';
import { PostgresDeleteCronogramRepository } from '../repositories/cronogram/delete-cronogram/postgres-delete-cronogram';
import { DeleteCronogramController } from '../controllers/cronograms/delete-cronogram/delete-cronogram';

export const routes = Router();
routes.get('/', async (req, res) => {
  const cronogramRepository = new PostgresGetCronograms();
  const cronogramController = new GetCronogramController(cronogramRepository);

  const { statusCode, body } = await cronogramController.handle();
  res.status(statusCode).json(body);
});
routes.post('/', async (req, res) => {
  const cronogramRepository = new PostgresCreateCronogram();
  const cronogramController = new CreateCronogramController(
    cronogramRepository,
  );

  const { statusCode, body } = await cronogramController.handle({
    body: req.body,
  });
  res.status(statusCode).json(body);
});
routes.get('/:id', async (req, res) => {
  const cronogramRepository = new PostgresGetDetailCronogram();
  const cronogramController = new GetDetailCronogramController(
    cronogramRepository,
  );

  const { statusCode, body } = await cronogramController.handle({
    params: req.params.id,
  });
  res.status(statusCode).json(body);
});
routes.put('/:id', async (req, res) => {
  const cronogramRepository = new PostgresUpdateCronogramRepository();
  const cronogramController = new UpdateCronogramController(
    cronogramRepository,
  );

  const { statusCode, body } = await cronogramController.handle({
    params: req.params.id,
    body: req.body,
  });
  res.status(statusCode).json(body);
});
routes.delete('/:id', async (req, res) => {
  const cronogramRepository = new PostgresDeleteCronogramRepository();
  const cronogramController = new DeleteCronogramController(
    cronogramRepository,
  );

  const { statusCode, body } = await cronogramController.handle({
    params: req.params.id,
  });
  res.status(statusCode).json(body);
});
