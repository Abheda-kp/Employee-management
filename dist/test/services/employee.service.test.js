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
const jest_mock_extended_1 = require("jest-mock-extended");
//import {EmployeeRepository} from "../../repositories/employee.repository";
const employee_service_1 = require("../../services/employee.service");
const jest_when_1 = require("jest-when");
describe('EmployeeService', () => {
    let employeeRepository;
    let departmentService;
    let employeeService;
    beforeEach(() => {
        employeeRepository = (0, jest_mock_extended_1.mock)();
        departmentService = (0, jest_mock_extended_1.mock)();
        employeeService = new employee_service_1.EmployeeService(employeeRepository, departmentService);
    });
    describe('getEmployeeByID', () => {
        it('test an employee without valid id', () => __awaiter(void 0, void 0, void 0, function* () {
            // const employee:Employee = new Employee()
            (0, jest_when_1.when)(employeeRepository.findById).calledWith(jest_mock_extended_1.anyNumber).mockReturnValue(null);
            // expect(employeeService.getEmployeeById(9)).rejects.toThrow(new HttpException(400,"Employee not found"))
            const result = yield employeeService.getEmployeeById(9);
            expect(result).toBeNull;
        }));
        it('test an employee with valid id', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockEmployee = {
                id: 10,
                name: "Name"
            };
            (0, jest_when_1.when)(employeeRepository.findById).calledWith(12).mockReturnValue(mockEmployee);
            const result = yield employeeService.getEmployeeById(12);
            expect(result).toStrictEqual(mockEmployee);
        }));
    });
});
//# sourceMappingURL=employee.service.test.js.map