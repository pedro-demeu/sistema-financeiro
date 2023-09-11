import { RepeatType } from '@prisma/client';
import prismaClient from '../../../database/prismaClient';
import { IController, HttpRequest, HttpResponse } from '../../protocols';
import { CronogramRepository, CronogramUpdateParams } from './protocols';
import { ICronogram } from '../../../models/Cronogram';

export class UpdateFinanceController implements IController {
  constructor(
    private readonly updateCronogramRepository: CronogramRepository,
  ) {}

  private validateRequest(body: CronogramUpdateParams): string | null {
    if (!body?.type) return 'type_required';
    if (!RepeatType[body.type]) return 'type_invalid';
    if (!body?.dueDate) return 'dueDate_required';
    if (!body?.repeat) return 'repeat_required';
    if (!body?.status) return 'status_required';
    return null;
  }

  async handle(
    httpRequest: HttpRequest<CronogramUpdateParams>,
  ): Promise<HttpResponse<ICronogram>> {
    try {
      const id = Number(httpRequest?.params?.id);
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: 'id_required',
        };
      }

      if (!body) {
        return {
          statusCode: 400,
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

      const cronogram = await prismaClient.cronogram.findUnique({
        where: {
          id: id,
        },
      });

      if (!cronogram) {
        return {
          statusCode: 400,
          body: 'cronogram_not_found',
        };
      }

      const financeResponse =
        await this.updateCronogramRepository.updateCronogram(id, {
          ...body,
          updatedAt: new Date(),
        });

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
