import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewrowsEmployee1747989546482 implements MigrationInterface {
    name = 'AddNewrowsEmployee1747989546482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "type" TO "status"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."employee_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PROBATION')`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" "public"."employee_status_enum" NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."employee_status_enum"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "status" TO "type"`);
    }

}
