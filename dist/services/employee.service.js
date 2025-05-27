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
exports.EmployeeService = void 0;
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_service_1 = require("./logger.service");
class EmployeeService {
    constructor(employeeRepository, departmentService) {
        this.employeeRepository = employeeRepository;
        this.departmentService = departmentService;
        this.logger = logger_service_1.LoggerService.getInstance(EmployeeService.name);
    }
    createEmployee(createEmployeeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmployee = new employee_entity_1.default();
            newEmployee.name = createEmployeeDto.name;
            newEmployee.email = createEmployeeDto.email;
            newEmployee.age = createEmployeeDto.age;
            newEmployee.address = createEmployeeDto.address;
            newEmployee.password = yield bcrypt_1.default.hash(createEmployeeDto.password, 10);
            newEmployee.role = createEmployeeDto.role;
            newEmployee.dateOfJoining = new Date(createEmployeeDto.dateOfJoining);
            newEmployee.employeeID = createEmployeeDto.employeeID;
            newEmployee.status = createEmployeeDto.status;
            newEmployee.experience = createEmployeeDto.experience;
            const isPresent = yield this.departmentService.getDepartmentById(createEmployeeDto.departmentId);
            if (!isPresent) {
                throw new Error('department not found');
            }
            newEmployee.department = isPresent;
            this.logger.info("Creating....");
            return this.employeeRepository.create(newEmployee);
        });
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Fetching employees.....");
            return this.employeeRepository.findMany();
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Fetching employee.....");
            return this.employeeRepository.findById(id);
        });
    }
    getEmployeeByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Fetching employee.....");
            return this.employeeRepository.findByEmail(email);
        });
    }
    updateEmployee(id, updateEmployeeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = yield this.employeeRepository.findById(id);
            if (existingEmployee) {
                existingEmployee.name = updateEmployeeDto.name || existingEmployee.name;
                existingEmployee.email = updateEmployeeDto.email || existingEmployee.email;
                existingEmployee.age = updateEmployeeDto.age || existingEmployee.age;
                existingEmployee.address.line1 = updateEmployeeDto.address.line1 || existingEmployee.address.line1;
                existingEmployee.address.houseNo = updateEmployeeDto.address.houseNo || existingEmployee.address.houseNo;
                existingEmployee.address.line2 = updateEmployeeDto.address.line2 || existingEmployee.address.line2;
                existingEmployee.experience = updateEmployeeDto.experience || existingEmployee.experience;
                existingEmployee.status = updateEmployeeDto.status || existingEmployee.status;
                existingEmployee.dateOfJoining = updateEmployeeDto.dateOfJoining || existingEmployee.dateOfJoining;
                existingEmployee.employeeID = updateEmployeeDto.employeeID || existingEmployee.employeeID;
                existingEmployee.address.pincode = updateEmployeeDto.address.pincode || existingEmployee.address.pincode;
                existingEmployee.department.id = updateEmployeeDto.departmentId || existingEmployee.department.id;
                yield this.employeeRepository.update(id, existingEmployee);
            }
            this.logger.info("Updating employee.....");
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = yield this.employeeRepository.findById(id);
            if (existingEmployee) {
                yield this.employeeRepository.remove(existingEmployee);
                // await this.employeeRepository.delete(id);
            }
            this.logger.info("Deleting....");
        });
    }
    softRemove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = yield this.employeeRepository.findById(id);
            if (existingEmployee) {
                this.logger.warn(`Deleting employee $(id)`);
                yield this.employeeRepository.softremove(existingEmployee);
                this.logger.info("Deleting....");
            }
        });
    }
}
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map