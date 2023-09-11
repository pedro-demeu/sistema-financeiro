import { ICategory } from '../../../models/Category';
import { IController, HttpRequest, HttpResponse } from '../../protocols';
import { IUpdateCategoryRepository, UpdateCategoryParams } from './protocols';

export class UpdateCategoryController implements IController {
  constructor(
    private readonly updateCategoryRepository: IUpdateCategoryRepository,
  ) {}
  async handle(
    httpRequest: HttpRequest<UpdateCategoryParams>,
  ): Promise<HttpResponse<ICategory>> {
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

      const categoryResponse =
        await this.updateCategoryRepository.updateCategory(Number(id), body);
      return {
        statusCode: 200,
        body: categoryResponse,
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
