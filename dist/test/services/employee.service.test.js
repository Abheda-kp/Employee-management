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
const jest_when_1 = require("jest-when");
const employee_service_1 = require("../../services/employee.service");
const department_route_1 = require("../../routes/department.route");
describe('EmployeeService', () => {
    let employeeRepository;
    let employeeService;
    beforeEach(() => {
        employeeRepository = (0, jest_mock_extended_1.mock)();
        employeeService = new employee_service_1.EmployeeService(employeeRepository, department_route_1.departmentService);
    });
    describe('getEmployeeById', () => {
        it("get employee when id is present", () => __awaiter(void 0, void 0, void 0, function* () {
            //Arrange
            const mockEmployee = { id: 123, name: "Employee Name" };
            (0, jest_when_1.when)(employeeRepository.findById).calledWith(1).mockReturnValue(mockEmployee); //it says when 1 is called return mockEmployee,no connection with id inside mockemployee
            const user = yield employeeService.getEmployeeById(1);
            expect(employeeRepository.findById).toHaveBeenCalledWith(1);
            expect(user).toStrictEqual(mockEmployee);
        }));
        it("should throw error when user with provided  id does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
            //Arrange
            (0, jest_when_1.when)(employeeRepository.findById).calledWith(1).mockReturnValue(null);
            //Act
            expect(employeeService.getEmployeeById(2)).rejects.toThrow("Employee not found");
            //Assert
            expect(employeeRepository.findById).toHaveBeenCalledWith(2);
        }));
    });
});
//# sourceMappingURL=employee.service.test.js.map