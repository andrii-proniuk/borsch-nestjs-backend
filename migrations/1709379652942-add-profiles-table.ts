import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TABLES } from '../src/core/postgresql/tables.constants';

const profilesTable = new Table({
  name: TABLES.PROFILES,
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
    { name: 'nickname', type: 'varchar', length: '32' },
    { name: 'fullname', type: 'varchar', length: '64', isNullable: true },
    { name: 'created_at', type: 'timestamp', default: 'current_timestamp' },
    { name: 'updated_at', type: 'timestamp', default: 'current_timestamp' },
  ],
  foreignKeys: [
    {
      name: 'fk_profile_user_id',
      columnNames: ['user_id'],
      referencedTableName: TABLES.USERS,
      referencedColumnNames: ['id'],
    },
  ],
});

const socialMediaTable = new Table({
  name: TABLES.SOCIAL_MEDIA,
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
    { name: 'profile_id', type: 'integer' },
    { name: 'social_media', type: 'varchar', length: '16' },
    { name: 'nickname', type: 'varchar', length: '32' },
    { name: 'created_at', type: 'timestamp', default: 'current_timestamp' },
    { name: 'updated_at', type: 'timestamp', default: 'current_timestamp' },
  ],
  foreignKeys: [
    {
      name: 'fk_social_media_profile_id',
      columnNames: ['profile_id'],
      referencedTableName: TABLES.PROFILES,
      referencedColumnNames: ['id'],
    },
  ],
});

export class AddProfilesTable1709379652942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(profilesTable);
    await queryRunner.createTable(socialMediaTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(socialMediaTable);
    await queryRunner.dropTable(profilesTable);
  }
}
