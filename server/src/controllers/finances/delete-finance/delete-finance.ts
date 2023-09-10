import { IFinance } from '../../../models/Finance';
import { IController, HttpRequest, HttpResponse } from '../../protocols';
import { IDeleteFinancecRepository } from './protocols';

export class DeleteFinanceController implements IController {
  constructor(
    private readonly deleteFinanceRepository: IDeleteFinancecRepository,
  ) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<IFinance>> {
    try {
      const id = httpRequest.params.id;

      if (!id) {
        return {
          statusCode: 400,
          body: 'id_required',
        };
      }
      const category = await this.deleteFinanceRepository.deleteFinance(
        Number(id),
      );

      return {
        statusCode: 200,
        body: category,
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: 'internal_server_error',
      };
    }
  }
}
