import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDepartment1747974058653 implements MigrationInterface {
    name = 'AddDepartment1747974058653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "department_name" character varying NOT NULL, CONSTRAINT "UQ_980e3e1f25ca867c47e38021bfc" UNIQUE ("department_name"), CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying NOT NULL DEFAULT 'password'`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_d62835db8c0aec1d18a5a927549" UNIQUE ("department_id")`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
        await queryRunner.query(`DROP TABLE "department"`);
    }

}
