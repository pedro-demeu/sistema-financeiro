import { IController } from '../../protocols';
import { IGetFinanceRepository } from './protocols';

export class GetFinancesController implements IController {
  constructor(private readonly getFinancesRepository: IGetFinanceRepository) {}

  async handle() {
    try {
      const finances = await this.getFinancesRepository.getFinances();

      return {
        statusCode: 200,
        body: finances,
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: 'internal_server_error',
      };
    }
  }
}
