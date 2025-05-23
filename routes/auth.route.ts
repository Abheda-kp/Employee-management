import { AuthController } from "../controllers/auth.controller"
import datasource from "../db/data-source";
import Employee from "../entities/employee.entity";
import { EmployeeRepository } from "../repositories/employee.repositories";
import { AuthService } from "../services/auth.service"
import {Router} from 'express'
import { employeeService } from "./employee.route";
const authRouter=Router();

//onst repository =datasource.getRepository(Employee);
//const employeeRepository=new EmployeeRepository(repository);
//const employeeService=new EmployeeService(employeeRepository);
const authService=new AuthService(employeeService);
new AuthController(authService,authRouter);

export default authRouter