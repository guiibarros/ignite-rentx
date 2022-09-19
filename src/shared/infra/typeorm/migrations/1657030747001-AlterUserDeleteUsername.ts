import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserDeleteUsername1657030747001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'username');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableColumn = new TableColumn({
      name: 'username',
      type: 'varchar',
    });

    await queryRunner.addColumn('users', tableColumn);
  }
}
