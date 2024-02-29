import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import { BadRequestException } from '../../common/exceptions/http.exception';

@Injectable()
export class TransactionService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async transaction<T>(
    cb: (entityManager: EntityManager) => Promise<T>,
  ): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    let result: T;
    let error: any | undefined;

    try {
      result = await cb(queryRunner.manager);

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      error = e;
    } finally {
      await queryRunner.release();
    }

    if (error) {
      throw new BadRequestException(error);
    }

    return result;
  }
}
