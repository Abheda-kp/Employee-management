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
exports.DepartmentController = void 0;
const httpException_1 = require("../exception/httpException");
const class_transformer_1 = require("class-transformer");
const department_dto_1 = require("../dto/department.dto");
const updateDept_dto_1 = require("../dto/updateDept.dto");
const class_validator_1 = require("class-validator");
const app_1 = require("../app");
class DepartmentController {
    constructor(departmentService, router) {
        this.departmentService = departmentService;
        this.updateById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const updateDepartmentDto = (0, class_transformer_1.plainToInstance)(updateDept_dto_1.UpdateDepartmentDto, req.body);
            const errors = yield (0, class_validator_1.validate)(updateDepartmentDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new httpException_1.HttpException(400, JSON.stringify(errors));
            }
            const id = Number(req.params.id);
            yield this.departmentService.updateDepartment(id, updateDepartmentDto);
            res.status(200).send("Updated");
        });
        router.post("/", this.createDepartment.bind(this));
        router.get("/", this.getAllDepartment.bind(this));
        router.get("/:id", this.getDepartmentById.bind(this));
        router.put("/:id", this.updateById); //arrow function
        router.delete("/:id", this.deleteById.bind(this)); //can use arrow function also
        router.get("/:id/emp", this.getEmployeeByDepartmentId.bind(this));
    }
    createDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createDepartmentDto = (0, class_transformer_1.plainToInstance)(department_dto_1.CreateDepartmentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createDepartmentDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.HttpException(400, JSON.stringify(errors));
                }
                const savedDept = yield this.departmentService.createDepartment(createDepartmentDto.departmentName);
                res.status(201).send(savedDept);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.departmentService.getAllDepartment();
            res.status(200).send(employee);
        });
    }
    getDepartmentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const employee = yield this.departmentService.getDepartmentById(id);
                if (!employee) {
                    throw new httpException_1.HttpException(404, "Dept not found");
                }
                res.status(200).send(employee);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    getEmployeeByDepartmentId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const employee = yield this.departmentService.getEmployeebyDeptId(id);
                if (!employee) {
                    throw new httpException_1.HttpException(404, "Dept not found");
                }
                res.status(200).send(employee);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    deleteById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield this.departmentService.deleteDepartment(id);
                res.status(200).send("Department deleted");
            }
            catch (err) {
                app_1.logger.warn("Cannot delete the department");
                next(err);
            }
        });
    }
    deleteBySoftRemove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield this.departmentService.softRemove(id);
            res.status(200).send();
        });
    }
}
exports.DepartmentController = DepartmentController;
//# sourceMappingURL=department.controller.js.map