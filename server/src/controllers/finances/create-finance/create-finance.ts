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
      const data = httpRequest.body;
      if (!data?.name)
        return {
          statusCode: 400,
          body: 'name_required',
        };

      if (!data.name && data.name.length < 3)
        return {
          statusCode: 400,
          body: 'name_min_length_3',
        };

      if (!data?.type)
        return {
          statusCode: 400,
          body: 'type_required',
        };

      if (!data?.value)
        return {
          statusCode: 400,
          body: 'value_required',
        };

      if (!data?.isPaid)
        return {
          statusCode: 400,
          body: 'isPaid_required',
        };

      if (!data?.repeat)
        return {
          statusCode: 400,
          body: 'repeat_required',
        };

      if (!data?.repeatType)
        return {
          statusCode: 400,
          body: 'repeatType_required',
        };

      if (!data?.userId)
        return {
          statusCode: 400,
          body: 'userId_required',
        };

      const finance = await this.createFinanceRepository.createFinance({
        ...data,
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
