import { IController } from '../../protocols';
import { IGetCronogramsRepository } from './protocols';

export class GetCronogramController implements IController {
  constructor(
    private readonly getCronogramsRepository: IGetCronogramsRepository,
  ) {}

  async handle() {
    try {
      const cronograms = await this.getCronogramsRepository.getAllCronograms();

      return {
        statusCode: 200,
        body: cronograms,
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
