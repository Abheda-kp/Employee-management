import { anyNumber, mock, MockProxy } from "jest-mock-extended";
//import {EmployeeRepository} from "../../repositories/employee.repository";
import { EmployeeService } from "../../services/employee.service";
import { when } from "jest-when";
import Employee from "../../entities/employee.entity";
import { HttpException } from "../../exception/httpException";
import { DepartmentService } from "../../services/department.service";
import { EmployeeRepository } from "../../repositories/employee.repositories";
import { UpdateEmployeeDto } from "../../dto/update.dto";

describe("EmployeeService", () => {
  let employeeRepository: MockProxy<EmployeeRepository>;
  let departmentService: MockProxy<DepartmentService>;
  let employeeService: EmployeeService;
  beforeEach(() => {
    employeeRepository = mock<EmployeeRepository>();
    departmentService = mock<DepartmentService>();
    employeeService = new EmployeeService(
      employeeRepository,
      departmentService
    );
  });
  describe("getEmployeeByID", () => {
    it("test an employee without valid id", async () => {
      // const employee:Employee = new Employee()
      when(employeeRepository.findById)
        .calledWith(anyNumber)
        .mockReturnValue(null);
      // expect(employeeService.getEmployeeById(9)).rejects.toThrow(new HttpException(400,"Employee not found"))
      const result = await employeeService.getEmployeeById(9);
      expect(result).toBeNull;
    });
    it("test an employee with valid id", async () => {
      const mockEmployee = {
        id: 10,
        name: "Name",
      } as Employee;
      when(employeeRepository.findById)
        .calledWith(10)
        .mockReturnValue(mockEmployee);
      const result = await employeeService.getEmployeeById(10);
      expect(result).toStrictEqual(mockEmployee);
    });
  });

  describe("getAllEmployees", () => {
    it("should return employee list", async () => {
      const mockList = [{ id: 1 }, { id: 2 }] as Employee[];
      when(employeeRepository.findMany).mockResolvedValue(mockList);

      const result = await employeeService.getAllEmployees();
      expect(result).toHaveLength(2);
      expect(result).toEqual(mockList);
    });
    it("should not return employee list", async () => {
      when(employeeRepository.findMany).mockResolvedValue(null);
      const result = await employeeService.getAllEmployees();
      expect(result).toBeNull;
    });
  });

  describe("updateEmployeeById", () => {
    it("test for updating employee", async () => {
      const mockUpdateEmployeeDto = {
        name: "New Name",
      } as UpdateEmployeeDto;
      const mockEmployeeBeforeUpdate = {
        id: 10,
        name: "Name",
      } as Employee;
      const mockEmployeeAfterUpdate = {
        id: 10,
        name: "New Name",
      } as Employee;
      when(employeeRepository.findById)
        .calledWith(10)
        .mockReturnValue(mockEmployeeBeforeUpdate);
      when(employeeRepository.update)
        .calledWith(10, mockEmployeeAfterUpdate)
        .mockReturnValue(mockEmployeeAfterUpdate);
      const result = await employeeService.updateEmployee(
        10,
        mockUpdateEmployeeDto
      );
      console.log(result);
      expect(result).toStrictEqual(mockEmployeeAfterUpdate);
    });
    it("test for wrong emp id", async () => {
      const mockUpdateEmployeeDto = {
        name: "New Name",
      } as UpdateEmployeeDto;
      const mockError = new HttpException(404, "Employee not found");
      when(employeeRepository.findById)
        .calledWith(anyNumber)
        .mockReturnValue(null);
      expect(employeeService.updateEmployee(10, mockUpdateEmployeeDto));
    });
  });

  describe("deleteEmployee", () => {
    it("should call remove if employee exists", async () => {
      const mockEmployee = { id: 1 } as Employee;
      when(employeeRepository.findById)
        .calledWith(1)
        .mockResolvedValue(mockEmployee);

      await employeeService.deleteEmployee(1);

      expect(employeeRepository.remove).toHaveBeenCalledWith(mockEmployee);
    });
    it("should not call remove if employee does not exist", async () => {
      when(employeeRepository.findById).calledWith(99).mockResolvedValue(null);

      await employeeService.deleteEmployee(99);

      expect(employeeRepository.remove).not.toHaveBeenCalled();
    });
  });
});
