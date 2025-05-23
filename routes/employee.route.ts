import express from 'express';
import Employee from '../entities/employee.entity';
import { EmployeeRepository } from '../repositories/employee.repositories';
import datasource from '../db/data-source';
import { EmployeeController } from '../controllers/employee.controller';
import { EmployeeService } from '../services/employee.service';
import { DepartmentService } from '../services/department.service';
import Department from '../entities/department.entity';
import { DepartmentRepository } from '../repositories/department.repositories';

const employeeRouter=express.Router()

const employeeRepository=new EmployeeRepository(datasource.getRepository(Employee))
const departmentRepository=new DepartmentRepository(datasource.getRepository(Department))
const departmentService=new DepartmentService(departmentRepository);
const employeeService=new EmployeeService(employeeRepository,departmentService);
const employeeController=new EmployeeController(employeeService,employeeRouter)

export default employeeRouter
export {employeeService}