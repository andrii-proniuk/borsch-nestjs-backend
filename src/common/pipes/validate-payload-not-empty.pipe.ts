import { PipeTransform } from '@nestjs/common';
import { BadRequestException } from '../exceptions/http.exception';

export class ValidatePayloadNotEmptyPipe implements PipeTransform {
  transform(data: unknown) {
    if (typeof data !== 'object' || Array.isArray(data) || data === null) {
      return data;
    }

    const payloadDataEmpty = !Object.keys(data)?.length;

    if (payloadDataEmpty) {
      throw new BadRequestException();
    }

    return data;
  }
}
