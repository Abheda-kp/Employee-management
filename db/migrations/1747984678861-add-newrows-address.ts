import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewrowsAddress1747984678861 implements MigrationInterface {
    name = 'AddNewrowsAddress1747984678861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "house_no" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "house_no"`);
    }

}
