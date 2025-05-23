"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDepartment1747974058653 = void 0;
class AddDepartment1747974058653 {
    constructor() {
        this.name = 'AddDepartment1747974058653';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "department_name" character varying NOT NULL, CONSTRAINT "UQ_980e3e1f25ca867c47e38021bfc" UNIQUE ("department_name"), CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying NOT NULL DEFAULT 'password'`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_d62835db8c0aec1d18a5a927549"`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_d62835db8c0aec1d18a5a927549" UNIQUE ("department_id")`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
            yield queryRunner.query(`DROP TABLE "department"`);
        });
    }
}
exports.AddDepartment1747974058653 = AddDepartment1747974058653;
//# sourceMappingURL=1747974058653-add-department.js.map