import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TABLES } from '../src/core/postgresql/tables.constants';

const usersTable = new Table({
  name: TABLES.USERS,
  columns: [
    {
      name: 'id',
      type: 'integer',
      isGenerated: true,
      generatedIdentity: 'ALWAYS',
      generationStrategy: 'increment',
      isPrimary: true,
      isNullable: true,
    },
    { name: 'email', type: 'varchar' },
    { name: 'password', type: 'varchar' },
    { name: 'email_verified', type: 'boolean', default: 'false' },
    { name: 'role', type: 'varchar', length: '16', default: 'user' },
    { name: 'refresh_token', type: 'varchar', isNullable: true },
    { name: 'created_at', type: 'timestamp', default: 'current_timestamp' },
    { name: 'updated_at', type: 'timestamp', default: 'current_timestamp' },
  ],
});

const emailVerificationCodesTable = new Table({
  name: TABLES.EMAIL_VERIFICATION_CODES,
  columns: [
    {
      name: 'id',
      type: 'integer',
      isGenerated: true,
      generatedIdentity: 'ALWAYS',
      generationStrategy: 'increment',
      isPrimary: true,
      isNullable: true,
    },
    { name: 'user_id', type: 'integer' },
    { name: 'code', type: 'varchar' },
    { name: 'created_at', type: 'timestamp', default: 'current_timestamp' },
  ],
  foreignKeys: [
    {
      name: TABLES.USERS,
      columnNames: ['user_id'],
      referencedTableName: TABLES.USERS,
      referencedColumnNames: ['id'],
    },
  ],
});

export class AddUserTable1709379086944 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(usersTable);
    await queryRunner.createTable(emailVerificationCodesTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(emailVerificationCodesTable);
    await queryRunner.dropTable(usersTable);
  }
}
