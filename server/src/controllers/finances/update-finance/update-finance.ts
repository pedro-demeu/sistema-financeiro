import prismaClient from '../../../database/prismaClient';
import { IFinance } from '../../../models/Finance';
import { IController, HttpRequest, HttpResponse } from '../../protocols';
import { IUpdateFinanceRepository, UpdateFinanceParams } from './protocols';

export class UpdateFinanceController implements IController {
  constructor(
    private readonly updateCategoryRepository: IUpdateFinanceRepository,
  ) {}
  async handle(
    httpRequest: HttpRequest<UpdateFinanceParams>,
  ): Promise<HttpResponse<IFinance>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return {
          statusCode: 400,
          body: 'missing_body',
        };
      }

      if (!id) {
        return {
          statusCode: 400,
          body: `missing_param_id`,
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
