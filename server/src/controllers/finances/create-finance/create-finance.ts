import { FinanceType, PaymentMethodType } from '@prisma/client';
import { IFinance } from '../../../models/Finance';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { CreateFinanceParams, ICreateFinanceRepository } from './protocols';

export class CreateFinanceController implements IController {
  constructor(
    private readonly createFinanceRepository: ICreateFinanceRepository,
  ) {}

  private validateRequest(body: CreateFinanceParams): string | null {
    if (!body?.name) return 'name_required';
    if (body.name.length < 3) return 'name_min_length_3';
    if (!body?.type) return 'type_required';
    if (!FinanceType[body.type]) return 'type_invalid';
    if (!body?.value) return 'value_required';
    if (!body?.isPaid) return 'isPaid_required';
    if (!body.beneficiary) return 'beneficiary_required';
    if (!PaymentMethodType[body.paymentMethod]) return 'payment_invalid';
    if (!body?.userId) return 'userId_required';
    if (!body?.expiration) return 'expiration_required';
    return null;
  }

  async handle(
    httpRequest: HttpRequest<CreateFinanceParams>,
  ): Promise<HttpResponse<IFinance>> {
    try {
      const body = httpRequest.body;

      if (!body) {
        return {
          statusCode: 500,
          body: 'body_required',
        };
      }
      const validationError = this.validateRequest(body);

      if (validationError) {
        return {
          statusCode: 400,
          body: validationError,
        };
      }

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
