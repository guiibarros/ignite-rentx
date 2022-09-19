import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserAddAvatar1657200104900 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const avatarColumn = new TableColumn({
      name: 'avatar',
      type: 'varchar',
      isNullable: true,
    });

    await queryRunner.addColumn('users', avatarColumn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar');
  }
}
