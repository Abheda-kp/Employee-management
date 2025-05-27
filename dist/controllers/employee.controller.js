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
exports.EmployeeController = void 0;
const employee_entity_1 = require("../entities/employee.entity");
const httpException_1 = require("../exception/httpException");
const class_transformer_1 = require("class-transformer");
const employee_dto_1 = require("../dto/employee.dto");
const update_dto_1 = require("../dto/update.dto");
const class_validator_1 = require("class-validator");
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const app_1 = require("../app");
class EmployeeController {
    constructor(employeeService, router) {
        this.employeeService = employeeService;
        this.updateById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updateEmployeeDto = (0, class_transformer_1.plainToInstance)(update_dto_1.UpdateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(updateEmployeeDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.HttpException(400, String(errors));
                }
                const id = Number(req.params.id);
                yield this.employeeService.updateEmployee(id, updateEmployeeDto);
                app_1.logger.info("Updated");
                res.status(200).send();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        router.post("/", (0, authorization_middleware_1.authorizationMiddleware)([employee_entity_1.EmployeeRole.HR, employee_entity_1.EmployeeRole.DEVELOPER]), this.createEmployee.bind(this));
        router.get("/", this.getAllEmployee.bind(this));
        router.get("/:id", this.getEmployeeById.bind(this));
        router.put("/:id", (0, authorization_middleware_1.authorizationMiddleware)([employee_entity_1.EmployeeRole.HR, employee_entity_1.EmployeeRole.DEVELOPER]), this.updateById); //arrow function
        router.delete("/:id", (0, authorization_middleware_1.authorizationMiddleware)([employee_entity_1.EmployeeRole.HR, employee_entity_1.EmployeeRole.DEVELOPER]), this.deleteById.bind(this)); //can use arrow function also
    }
    createEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createEmployeeDto = (0, class_transformer_1.plainToInstance)(employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createEmployeeDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.HttpException(400, JSON.stringify(errors));
                }
                const savedEmployee = yield this.employeeService.createEmployee(createEmployeeDto);
                app_1.logger.info("Employee created");
                res.status(201).send(savedEmployee);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.user);
            const employee = yield this.employeeService.getAllEmployees();
            app_1.logger.info("Fetched all employees");
            res.status(200).send(employee);
        });
    }
    getEmployeeById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const employee = yield this.employeeService.getEmployeeById(id);
                if (!employee) {
                    throw new httpException_1.HttpException(404, "employee not found");
                }
                app_1.logger.info("Fetched employee");
                res.status(200).send(employee);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield this.employeeService.deleteEmployee(id);
            app_1.logger.info("Deleted");
            res.status(200).send();
        });
    }
    deleteBySoftRemove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield this.employeeService.softRemove(id);
            app_1.logger.info("Deleted");
            res.status(200).send();
        });
    }
}
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employee.controller.js.map