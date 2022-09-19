import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSpecificationsCars1658809137522
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'specifications_cars',
      columns: [
        {
          name: 'specification_id',
          type: 'uuid',
        },
        {
          name: 'car_id',
          type: 'uuid',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    });

    await queryRunner.createTable(table);

    await queryRunner.createForeignKeys('specifications_cars', [
      new TableForeignKey({
        name: 'FKSpecificationCar',
        columnNames: ['specification_id'],
        referencedTableName: 'specifications',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
      new TableForeignKey({
        name: 'FKCarSpecification',
        columnNames: ['car_id'],
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'specifications_cars',
      'FKSpecificationCar'
    );

    await queryRunner.dropForeignKey(
      'specifications_cars',
      'FKCarSpecification'
    );

    await queryRunner.dropTable('specifications_cars');
  }
}
