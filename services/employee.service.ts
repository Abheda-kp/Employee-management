import { CreateAddressDto } from "../dto/address.dto";
import Address from "../entities/address.entity";
import Employee, { EmployeeRole, Status } from "../entities/employee.entity";
import {EmployeeRepository} from "../repositories/employee.repositories";
import { UpdateEmployeeDto } from "../dto/update.dto";
import bcrypt from 'bcrypt';
import { LoggerService } from "./logger.service";
import { employeeService } from "../routes/employee.route";
import Department from "../entities/department.entity";
import { CreateDepartmentDto } from "../dto/department.dto";
import { DepartmentService } from "./department.service";
import { HttpException } from "../exception/httpException";
import { logger } from "../app";
import { error } from "console";

export class EmployeeService{
       constructor(private employeeRepository:EmployeeRepository,private departmentService:DepartmentService){}
       
       async createEmployee(email:string,name:string,age:number,address:CreateAddressDto,password:string,role:EmployeeRole,departmentID:number,status:Status,employeeID:string,dateOfJoining:Date,experience:number):Promise<Employee>{
          const newEmployee=new Employee();
          newEmployee.name=name;
          newEmployee.email=email;
          newEmployee.age=age;
          newEmployee.address=address as Address;
          newEmployee.password=await bcrypt.hash(password,10);
          newEmployee.role=role;
          newEmployee.dateOfJoining=new Date(dateOfJoining);
          newEmployee.employeeID=employeeID;
          newEmployee.status=status;
          newEmployee.experience=experience;
          const isPresent=await this.departmentService.getDepartmentById(departmentID);
          if(!isPresent){       
                        throw new Error('department not found');       
                                
          }
          newEmployee.department=isPresent;
         logger.info("Creating....");
          return this.employeeRepository.create(newEmployee);
          
       }
       async getAllEmployees():Promise<Employee[]>{
                 
                  logger.info("Fetching employees.....");
                 return this.employeeRepository.findMany();

       }

       async getEmployeeById(id:number):Promise<Employee>{
             logger.info("Fetching employee.....");
             return this.employeeRepository.findById(id);
       }


       async getEmployeeByEmail(email:string):Promise<Employee>{
          logger.info("Fetching employee.....");
          return this.employeeRepository.findByEmail(email);

       }
       
       async updateEmployee(id:number,updateEmployeeDto:UpdateEmployeeDto):Promise<void>{
        const existingEmployee=await this.employeeRepository.findById(id);
        if(existingEmployee){
            
            existingEmployee.name=updateEmployeeDto.name || existingEmployee.name;
            existingEmployee.email=updateEmployeeDto.email || existingEmployee.email;
            existingEmployee.age=updateEmployeeDto.age || existingEmployee.age;
            existingEmployee.address.line1=updateEmployeeDto.address.line1 || existingEmployee.address.line1;
            existingEmployee.address.houseNo=updateEmployeeDto.address.houseNo || existingEmployee.address.houseNo;
            existingEmployee.address.line2=updateEmployeeDto.address.line2 || existingEmployee.address.line2;
            existingEmployee.experience=updateEmployeeDto.experience || existingEmployee.experience;
            existingEmployee.status=updateEmployeeDto.status || existingEmployee.status;
            existingEmployee.dateOfJoining=updateEmployeeDto.dateOfJoining || existingEmployee.dateOfJoining;
            existingEmployee.employeeID=updateEmployeeDto.employeeID || existingEmployee.employeeID;
            existingEmployee.address.pincode=updateEmployeeDto.address.pincode || existingEmployee.address.pincode;
            existingEmployee.department.id=updateEmployeeDto.departmentId  || existingEmployee.department.id;
            await this.employeeRepository.update(id,existingEmployee);
        }
        logger.info("Updating employee.....");
       }

       async deleteEmployee(id:number):Promise<void>{
        const existingEmployee=await this.employeeRepository.findById(id);
        if(existingEmployee){
            await this.employeeRepository.remove(existingEmployee);
           // await this.employeeRepository.delete(id);
       }
       logger.info("Deleting....")
       }

       async softRemove(id:number):Promise<void>{
        const existingEmployee=await this.employeeRepository.findById(id);
        if(existingEmployee){
            logger.warn(`Deleting employee $(id)`);
            await this.employeeRepository.softremove(existingEmployee);
        logger.info("Deleting....")

   }}
}

