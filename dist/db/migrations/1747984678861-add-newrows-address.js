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
exports.AddNewrowsAddress1747984678861 = void 0;
class AddNewrowsAddress1747984678861 {
    constructor() {
        this.name = 'AddNewrowsAddress1747984678861';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "address" ADD "house_no" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "house_no"`);
        });
    }
}
exports.AddNewrowsAddress1747984678861 = AddNewrowsAddress1747984678861;
//# sourceMappingURL=1747984678861-add-newrows-address.js.map