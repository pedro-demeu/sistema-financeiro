import { Category } from '@prisma/client';
import { IController, HttpRequest, HttpResponse } from '../../protocols';
import { CreateCategoryParams, ICreateCategoryRepository } from './protocols';
import prismaClient from '../../../database/prismaClient';

export class CreateCategoryController implements IController {
  constructor(
    private readonly createCategoryRepository: ICreateCategoryRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateCategoryParams>,
  ): Promise<HttpResponse<Category>> {
    try {
      const body = httpRequest.body;

      if (!body?.name) {
        return {
          statusCode: 400,
          body: 'name_required',
        };
      }

      if (body.name.length < 3) {
        return {
          statusCode: 400,
          body: 'name_min_length_3',
        };
      }
      const findByName = await prismaClient.category.findFirst({
        where: {
          name: body.name,
        },
      });

      if (findByName) {
        return {
          statusCode: 400,
          body: 'category_already_exists',
        };
      }

      const category = await this.createCategoryRepository.createCategory(body);

      return {
        statusCode: 201,
        body: category,
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: err as string,
      };
    }
  }
}
