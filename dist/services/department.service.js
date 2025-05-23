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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentService = void 0;
const department_entity_1 = __importDefault(require("../entities/department.entity"));
const app_1 = require("../app");
class DepartmentService {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    createDepartment(departmentName) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDepartment = new department_entity_1.default();
            newDepartment.departmentName = departmentName;
            return this.departmentRepository.create(newDepartment);
        });
    }
    getAllDepartment() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.findMany();
        });
    }
    getDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.findDeptById(id);
        });
    }
    getEmployeebyDeptId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.getAllEmployeeByDeptId(id);
        });
    }
    updateDepartment(id, updateDepartmentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDept = yield this.departmentRepository.findDeptById(id);
            if (existingDept) {
                existingDept.departmentName = updateDepartmentDto.departmentName;
                yield this.departmentRepository.update(id, existingDept);
            }
        });
    }
    deleteDepartment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDept = yield this.departmentRepository.findDeptById(id);
            if (existingDept) {
                app_1.logger.warn(`Deleting department $(id)`);
                yield this.departmentRepository.remove(existingDept);
                // await this.employeeRepository.delete(id);
            }
        });
    }
    softRemove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDept = yield this.departmentRepository.findDeptById(id);
            if (existingDept) {
                app_1.logger.warn(`Deleting department $(id)`);
                yield this.departmentRepository.softremove(existingDept);
            }
        });
    }
}
exports.DepartmentService = DepartmentService;
//# sourceMappingURL=department.service.js.map