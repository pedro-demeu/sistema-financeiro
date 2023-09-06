import { Category } from '@prisma/client';
import { IController, HttpRequest, HttpResponse } from '../protocols';
import { CreateCategoryParams, ICreateCategoryRepository } from './protocols';

export class CreateCategoryController implements IController {
  constructor(
    private readonly createCategoryRepository: ICreateCategoryRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateCategoryParams>,
  ): Promise<HttpResponse<Category>> {
    try {
      const name = httpRequest.body;
      if (!name)
        return {
          statusCode: 400,
          body: 'name_required',
        };

      if (String(name).length < 3)
        return {
          statusCode: 400,
          body: 'name_min_length_3',
        };

      const category = await this.createCategoryRepository.createCategory(name);

      return {
        statusCode: 201,
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
