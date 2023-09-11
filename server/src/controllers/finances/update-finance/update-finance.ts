import { FinanceType, PaymentMethodType } from '@prisma/client';
import prismaClient from '../../../database/prismaClient';
import { IFinance } from '../../../models/Finance';
import { IController, HttpRequest, HttpResponse } from '../../protocols';
import { IUpdateFinanceRepository, UpdateFinanceParams } from './protocols';

export class UpdateFinanceController implements IController {
  constructor(
    private readonly updateCategoryRepository: IUpdateFinanceRepository,
  ) {}

  private validateRequest(
    id: string | undefined,
    body: UpdateFinanceParams | undefined,
  ): string | null {
    if (!body) return 'missing_body';
    if (!id) return 'missing_param_id';

    if (body.name.length < 3) return 'name_min_length_3';
    if (!body?.type) return 'type_required';
    if (!FinanceType[body.type]) return 'type_invalid';
    if (!body?.value) return 'value_required';
    if (!body?.isPaid) return 'isPaid_required';
    if (!body.beneficiary) return 'beneficiary_required';
    if (!PaymentMethodType[body.paymentMethod]) return 'payment_invalid';
    if (!body?.expiration) return 'expiration_required';
    return null;
  }

  async handle(
    httpRequest: HttpRequest<UpdateFinanceParams>,
  ): Promise<HttpResponse<IFinance>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return {
          statusCode: 500,
          body: 'body_required',
        };
      }

      const validationError = this.validateRequest(id, body);

      if (validationError) {
        return {
          statusCode: 400,
          body: validationError,
        };
      }

      const finance = await prismaClient.finance.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!finance) {
        return {
          statusCode: 400,
          body: 'finance_not_found',
        };
      }

      if (body?.categories?.length) {
        await prismaClient.financeCategories.deleteMany({
          where: {
            financeId: Number(id),
          },
        });

        for (const categoryId of body?.categories) {
          const categoryExists = await prismaClient.category.findUnique({
            where: {
              id: Number(categoryId),
            },
          });

          if (!categoryExists) {
            return {
              statusCode: 400,
              body: 'category_not_found',
            };
          }

          await prismaClient.financeCategories.create({
            data: {
              financeId: Number(id),
              categoryId,
            },
          });
        }
      } else {
        await prismaClient.financeCategories.deleteMany({
          where: {
            financeId: Number(id),
          },
        });
      }

      const financeResponse = await this.updateCategoryRepository.updateFinance(
        Number(id),
        body,
      );
      return {
        statusCode: 200,
        body: financeResponse,
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
