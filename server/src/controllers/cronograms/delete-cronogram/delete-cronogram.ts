import prismaClient from '../../../database/prismaClient';
import { ICronogram } from '../../../models/Cronogram';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { IDeleteCronogramRepository } from './protocols';

export class DeleteCronogramController implements IController {
  constructor(
    private readonly deleteCronogramRepository: IDeleteCronogramRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<ICronogram>> {
    try {
      const id = Number(httpRequest.params?.id);

      if (!id) {
        return {
          statusCode: 400,
          body: 'missing_id_param',
        };
      }

      const checkIfIdExists = await prismaClient.cronogram.findFirst({
        where: {
          id: id,
        },
      });

      if (!checkIfIdExists) {
        return {
          statusCode: 400,
          body: 'cronogram_not_found',
        };
      }

      const cronogram =
        await this.deleteCronogramRepository.deleteCronogram(id);

      return {
        statusCode: 200,
        body: cronogram,
      };
    } catch (err) {
      console.error({
        err,
      });
      return {
        statusCode: 500,
        body: 'internal_server_error',
      };
    }
  }
}
