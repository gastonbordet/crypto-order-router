import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInitialConfiguration1711473079727 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO price_configuration_entity ("exchangeFee", "spread", "deprecated_at")
            VALUES ($1, $2, null)
        `, [1.5, 1.0]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM price_configuration_entity WHERE id = 1
        `);
    }

}
