"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeService = void 0;
const express_1 = __importDefault(require("express"));
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const employee_repositories_1 = require("../repositories/employee.repositories");
const data_source_1 = __importDefault(require("../db/data-source"));
const employee_controller_1 = require("../controllers/employee.controller");
const employee_service_1 = require("../services/employee.service");
const department_route_1 = require("./department.route");
const employeeRouter = express_1.default.Router();
const employeeRepository = new employee_repositories_1.EmployeeRepository(data_source_1.default.getRepository(employee_entity_1.default));
// const departmentRepository=new DepartmentRepository(datasource.getRepository(Department))
// const departmentService=new DepartmentService(departmentRepository);
const employeeService = new employee_service_1.EmployeeService(employeeRepository, department_route_1.departmentService);
exports.employeeService = employeeService;
const employeeController = new employee_controller_1.EmployeeController(employeeService, employeeRouter);
exports.default = employeeRouter;
//# sourceMappingURL=employee.route.js.map