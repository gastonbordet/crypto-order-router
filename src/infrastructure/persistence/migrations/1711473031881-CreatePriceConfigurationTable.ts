import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePriceConfigurationTable1711473031881 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "price_configuration_entity",
            columns: [{
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true
            },
            {
                name: "exchangeFee",
                type: "float",
            },
            {
                name: "spread",
                type: "float",
            },
            {
                name: "deprecated_at",
                type: "date",
                isNullable: true
            }]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("price_configuration_entity", true);
    }

}
