import { EmployeeService } from "../services/employee.service";
import Employee from "../entities/employee.entity";
import {Request,Response,Router,NextFunction} from "express";
import { EmployeeRepository } from "../repositories/employee.repositories";
import { errorMiddleware } from "../middlewares/errorMiddleware";
import { HttpException } from "../exception/httpException";
import { isEmail } from "../emailValidator";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/employee.dto";
import {UpdateEmployeeDto} from "../dto/update.dto";
import { validate } from "class-validator";
import { CreateDepartmentDto } from "../dto/department.dto";
import { authorizationMiddleware } from "../middlewares/authorization.middleware";
import { logger } from "../app";

console.log("hie")

export class EmployeeController{
    constructor(private employeeService:EmployeeService,router:Router){
        router.post("/",this.createEmployee.bind(this));
        router.get("/",this.getAllEmployee.bind(this));
        router.get("/:id",this.getEmployeeById.bind(this));
        router.put("/:id",this.updateById)    //arrow function
        router.delete("/:id",this.deleteById.bind(this))  //can use arrow function also
    }

    async createEmployee(req:Request,res:Response,next:NextFunction){
        try {
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const savedEmployee = await this.employeeService.createEmployee(
        
        createEmployeeDto.email,
        createEmployeeDto.name,
        createEmployeeDto.age,
        createEmployeeDto.address,
        createEmployeeDto.password,
        createEmployeeDto.role,
        createEmployeeDto.departmentId,
        createEmployeeDto.status,
        createEmployeeDto.employeeID,
        createEmployeeDto.dateOfJoining,
        createEmployeeDto.experience


      );
      logger.info("Employee created");
      res.status(201).send(savedEmployee);
    } catch (error) {
      next(error);
    }}

    async getAllEmployee(req:Request,res:Response){
        console.log(req.user)
        const employee =await this.employeeService.getAllEmployees();
        logger.info("Fetched all employees");
        res.status(200).send(employee);
    }
    
     async getEmployeeById(req:Request,res:Response,next:NextFunction){
        try{
        const id = Number(req.params.id);
        const employee=await this.employeeService.getEmployeeById(id)
        if(!employee){
            throw new HttpException(404,'employee not found');
        }
        logger.info("Fetched employee");
        res.status(200).send(employee);}
        catch(error){
            
            console.log(error);
            next(error)
        }
        
     }

     updateById=async (req:Request,res:Response,next:NextFunction)=>{
        try{
        const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);
        const errors = await validate(updateEmployeeDto);
         
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, String(errors));
      }
        const id = Number(req.params.id);
    
        await this.employeeService.updateEmployee(id,updateEmployeeDto);
        logger.info("Updated")
        res.status(200).send();}
        catch(error){
          console.log(error)
          next(error)
        }
     }

     async deleteById(req:Request,res:Response){
        const id = Number(req.params.id);
        await this.employeeService.deleteEmployee(id)
        logger.info("Deleted");
        res.status(200).send();
     }
     async deleteBySoftRemove(req:Request,res:Response){
        const id = Number(req.params.id);
        await this.employeeService.softRemove(id)
        logger.info("Deleted");
        res.status(200).send();
     }
}