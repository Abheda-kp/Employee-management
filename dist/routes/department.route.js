"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentService = void 0;
const express_1 = __importDefault(require("express"));
const department_entity_1 = __importDefault(require("../entities/department.entity"));
const department_repositories_1 = require("../repositories/department.repositories");
const data_source_1 = __importDefault(require("../db/data-source"));
const department_controller_1 = require("../controllers/department.controller");
const department_service_1 = require("../services/department.service");
const departmentRouter = express_1.default.Router();
const departmentRepository = new department_repositories_1.DepartmentRepository(data_source_1.default.getRepository(department_entity_1.default));
const departmentService = new department_service_1.DepartmentService(departmentRepository);
exports.departmentService = departmentService;
const employeeController = new department_controller_1.DepartmentController(departmentService, departmentRouter);
exports.default = departmentRouter;
//# sourceMappingURL=department.route.js.map