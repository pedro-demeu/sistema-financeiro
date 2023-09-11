import { IController } from '../../protocols';
import { IGetCategoriesRepository } from './protocols';

export class GetCategoriesController implements IController {
  constructor(private readonly getCategories: IGetCategoriesRepository) {}

  async handle() {
    try {
      const categories = await this.getCategories.getCategories();

      return {
        statusCode: 200,
        body: categories,
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
