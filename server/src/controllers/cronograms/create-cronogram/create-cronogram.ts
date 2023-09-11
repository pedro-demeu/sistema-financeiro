import { RepeatType } from '@prisma/client';
import { ICronogram } from '../../../models/Cronogram';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { CreateCronogramParams, ICreateCronogramRepository } from './protocols';

export class CreateCronogramController implements IController {
  constructor(
    private readonly createCronogramRepository: ICreateCronogramRepository,
  ) {}

  private validateRequest(body: CreateCronogramParams): string | null {
    if (!body?.financeId) return 'financeId_required';
    if (!body?.type) return 'type_required';
    if (!RepeatType[body.type]) return 'type_invalid';
    if (!body?.dueDate) return 'dueDate_required';
    if (!body?.repeat) return 'repeat_required';
    if (!body?.status) return 'status_required';
    return null;
  }

  async handle(
    httpRequest: HttpRequest<CreateCronogramParams>,
  ): Promise<HttpResponse<ICronogram>> {
    try {
      const body = httpRequest.body;
      if (!body)
        return {
          statusCode: 400,
          body: 'body_required',
        };

      const validationError = this.validateRequest(body);

      if (validationError) {
        return {
          statusCode: 400,
          body: validationError,
        };
      }

      const cronogram = await this.createCronogramRepository.createCronogram({
        ...body,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return {
        statusCode: 201,
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
