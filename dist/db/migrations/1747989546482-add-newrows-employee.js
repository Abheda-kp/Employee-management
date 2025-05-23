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
exports.AddNewrowsEmployee1747989546482 = void 0;
class AddNewrowsEmployee1747989546482 {
    constructor() {
        this.name = 'AddNewrowsEmployee1747989546482';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "type" TO "status"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
            yield queryRunner.query(`CREATE TYPE "public"."employee_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PROBATION')`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "status" "public"."employee_status_enum" NOT NULL DEFAULT 'ACTIVE'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
            yield queryRunner.query(`DROP TYPE "public"."employee_status_enum"`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "status" TO "type"`);
        });
    }
}
exports.AddNewrowsEmployee1747989546482 = AddNewrowsEmployee1747989546482;
//# sourceMappingURL=1747989546482-add-newrows-employee.js.map