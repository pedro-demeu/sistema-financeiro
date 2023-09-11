import { IFinance } from '../../../models/Finance';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { CreateFinanceParams, ICreateFinanceRepository } from './protocols';

export class CreateFinanceController implements IController {
  constructor(
    private readonly createFinanceRepository: ICreateFinanceRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateFinanceParams>,
  ): Promise<HttpResponse<IFinance>> {
    try {
      const body = httpRequest.body;

      if (!body?.name)
        return {
          statusCode: 400,
          body: 'name_required',
        };

      if (!body.name && body.name.length < 3)
        return {
          statusCode: 400,
          body: 'name_min_length_3',
        };

      if (!body?.type)
        return {
          statusCode: 400,
          body: 'type_required',
        };

      if (body.type !== 'INCOME' && body.type !== 'SPENDING')
        return {
          statusCode: 400,
          body: 'type_invalid',
        };

      if (!body?.value)
        return {
          statusCode: 400,
          body: 'value_required',
        };

      if (!body?.isPaid)
        return {
          statusCode: 400,
          body: 'isPaid_required',
        };

      if (!body?.repeat)
        return {
          statusCode: 400,
          body: 'repeat_required',
        };

      if (!body?.repeatType)
        return {
          statusCode: 400,
          body: 'repeatType_required',
        };

      if (
        body?.repeatType !== 'Monthly' &&
        body?.repeatType !== 'Weekly' &&
        body?.repeatType !== 'Yearly' &&
        body?.repeatType !== 'Never'
      )
        return {
          statusCode: 400,
          body: 'repeatType_type_invalid',
        };

      if (!body?.userId)
        return {
          statusCode: 400,
          body: 'userId_required',
        };

      const finance = await this.createFinanceRepository.createFinance({
        ...body,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return {
        statusCode: 201,
        body: finance,
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
