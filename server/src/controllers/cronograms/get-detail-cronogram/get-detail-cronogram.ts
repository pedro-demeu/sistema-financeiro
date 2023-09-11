import { ICronogram } from '../../../models/Cronogram';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { IGetDetailCronogramRepository } from './protocols';

export class GetDetailCronogramController implements IController {
  constructor(
    private readonly getDetailCronogramRepository: IGetDetailCronogramRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<ICronogram>> {
    const id = Number(httpRequest.params.id);

    if (!id) {
      return {
        statusCode: 400,
        body: 'id_required',
      };
    }

    try {
      const cronogram =
        await this.getDetailCronogramRepository.getCronogram(id);

      return {
        statusCode: 200,
        body: cronogram,
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
