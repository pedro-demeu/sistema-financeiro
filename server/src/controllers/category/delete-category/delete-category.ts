import prismaClient from '../../../database/prismaClient';
import { ICategory } from '../../../models/Category';
import { IController, HttpRequest, HttpResponse } from '../../protocols';
import { IDeleteCategoryRepository } from './protocols';

export class DeleteCategoryController implements IController {
  constructor(
    private readonly deleteCategoryRepository: IDeleteCategoryRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<ICategory>> {
    try {
      const id = httpRequest.params.id;

      if (!id) {
        return {
          statusCode: 400,
          body: 'id_required',
        };
      }

      const checkIfIdExists = await prismaClient.category.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!checkIfIdExists) {
        return {
          statusCode: 400,
          body: 'category_not_found',
        };
      }

      const categoryHasFinance = await prismaClient.financeCategories.findFirst(
        {
          where: {
            categoryId: Number(id),
          },
        },
      );

      if (categoryHasFinance) {
        await prismaClient.financeCategories.delete({
          where: {
            id: categoryHasFinance.id,
          },
        });
      }
      const category = await this.deleteCategoryRepository.deleteCategory(
        Number(id),
      );

      return {
        statusCode: 200,
        body: category,
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
