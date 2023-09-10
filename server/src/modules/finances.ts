import { Router } from 'express';
import { PostgresCreateFinance } from '../repositories/finances/create-finance/postgres-create-finance';
import { CreateFinanceController } from '../controllers/finances/create-finance/create-finance';
import { PostgresGetFinances } from '../repositories/finances/get-finances/postgres-get-finances';
import { GetFinancesController } from '../controllers/finances/get-finances/get-finances';
import { PostgresDeleteFinanceRepository } from '../repositories/finances/delete-finance/postgres-delete-finance';
import { DeleteFinanceController } from '../controllers/finances/delete-finance/delete-finance';

export const routes = Router();

routes.get('/', async (req, res) => {
  const financeRepository = new PostgresGetFinances();
  const getFinancesController = new GetFinancesController(financeRepository);
  const { body, statusCode } = await getFinancesController.handle();
  res.status(statusCode).json(body);
});

routes.post('/', async (req, res) => {
  const financeCreateRepository = new PostgresCreateFinance();
  const createFinanceController = new CreateFinanceController(
    financeCreateRepository,
  );

  const { body, statusCode } = await createFinanceController.handle({
    body: req.body,
  });
  res.status(statusCode).send(body);
});

routes.put('/:id', async (req, res) => {});

routes.delete('/:id', async (req, res) => {
  const financeRepository = new PostgresDeleteFinanceRepository();
  const deleteFinanceController = new DeleteFinanceController(
    financeRepository,
  );

  const { body, statusCode } = await deleteFinanceController.handle({
    params: req.params,
  });
  res.status(statusCode).send(body);
});
