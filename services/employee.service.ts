import { CreateAddressDto } from "../dto/address.dto";
import Address from "../entities/address.entity";
import Employee, { EmployeeRole, Status } from "../entities/employee.entity";
import { EmployeeRepository } from "../repositories/employee.repositories";
import { UpdateEmployeeDto } from "../dto/update.dto";
import bcrypt from "bcrypt";
import { LoggerService } from "./logger.service";
import { employeeService } from "../routes/employee.route";
import Department from "../entities/department.entity";
import { CreateDepartmentDto } from "../dto/department.dto";
import { DepartmentService } from "./department.service";
import { HttpException } from "../exception/httpException";

import { error } from "console";
import { CreateEmployeeDto } from "../dto/employee.dto";

export class EmployeeService {
  private logger = LoggerService.getInstance(EmployeeService.name);
  constructor(
    private employeeRepository: EmployeeRepository,
    private departmentService: DepartmentService
  ) {}

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto
  ): Promise<Employee> {
    const newEmployee = new Employee();
    newEmployee.name = createEmployeeDto.name;
    newEmployee.email = createEmployeeDto.email;
    newEmployee.age = createEmployeeDto.age;
    newEmployee.address = createEmployeeDto.address as Address;
    newEmployee.password = await bcrypt.hash(createEmployeeDto.password, 10);
    newEmployee.role = createEmployeeDto.role;
    newEmployee.dateOfJoining = new Date(createEmployeeDto.dateOfJoining);
    newEmployee.employeeID = createEmployeeDto.employeeID;
    newEmployee.status = createEmployeeDto.status;
    newEmployee.experience = createEmployeeDto.experience;
    const isPresent = await this.departmentService.getDepartmentById(
      createEmployeeDto.departmentId
    );
    if (!isPresent) {
      throw new Error("department not found");
    }
    newEmployee.department = isPresent;
    this.logger.info("Creating....");
    return this.employeeRepository.create(newEmployee);
  }
  async getAllEmployees(): Promise<Employee[]> {
    this.logger.info("Fetching employees.....");
    return this.employeeRepository.findMany();
  }

  async getEmployeeById(id: number): Promise<Employee> {
    this.logger.info("Fetching employee.....");
    return this.employeeRepository.findById(id);
  }

  async getEmployeeByEmail(email: string): Promise<Employee> {
    this.logger.info("Fetching employee.....");
    return this.employeeRepository.findByEmail(email);
  }

  async updateEmployee(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto
  ): Promise<Employee> {
    const existingEmployee = await this.employeeRepository.findById(id);
    if (existingEmployee) {
      existingEmployee.name = updateEmployeeDto.name || existingEmployee.name;
      existingEmployee.email =
        updateEmployeeDto.email || existingEmployee.email;
      existingEmployee.age = updateEmployeeDto.age || existingEmployee.age;
      if (updateEmployeeDto.address) {
        existingEmployee.address.line1 =
          updateEmployeeDto.address.line1 || existingEmployee.address.line1;
        existingEmployee.address.houseNo =
          updateEmployeeDto.address.houseNo || existingEmployee.address.houseNo;
        existingEmployee.address.pincode =
          updateEmployeeDto.address.pincode || existingEmployee.address.pincode;
        existingEmployee.address.line2 =
          updateEmployeeDto.address.line2 || existingEmployee.address.line2;
      }
      existingEmployee.experience =
        updateEmployeeDto.experience || existingEmployee.experience;
      existingEmployee.status =
        updateEmployeeDto.status || existingEmployee.status;
      existingEmployee.dateOfJoining =
        updateEmployeeDto.dateOfJoining || existingEmployee.dateOfJoining;
      existingEmployee.employeeID =
        updateEmployeeDto.employeeID || existingEmployee.employeeID;

      if (updateEmployeeDto.departmentId)
        existingEmployee.department.id =
          updateEmployeeDto.departmentId || existingEmployee.department.id;
      return await this.employeeRepository.update(id, existingEmployee);
    } else {
      new HttpException(404, "Employee not found");
    }
    this.logger.info("Updating employee.....");
  }

  async deleteEmployee(id: number): Promise<void> {
    const existingEmployee = await this.employeeRepository.findById(id);
    if (existingEmployee) {
      await this.employeeRepository.remove(existingEmployee);
      // await this.employeeRepository.delete(id);
    }
    this.logger.info("Deleting....");
  }

  async softRemove(id: number): Promise<void> {
    const existingEmployee = await this.employeeRepository.findById(id);
    if (existingEmployee) {
      this.logger.warn(`Deleting employee $(id)`);
      await this.employeeRepository.softremove(existingEmployee);
      this.logger.info("Deleting....");
    }
  }
}
