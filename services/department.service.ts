import { CreateAddressDto } from "../dto/address.dto";
import { UpdateDepartmentDto } from "../dto/updateDept.dto";
import Address from "../entities/address.entity";
import { UpdateEmployeeDto } from "../dto/update.dto";
import Department from "../entities/department.entity";
import {DepartmentRepository} from "../repositories/department.repositories";
import { logger } from "../app";

export class DepartmentService{
       constructor(private departmentRepository:DepartmentRepository){}
       
       async createDepartment(departmentName:string):Promise<Department>{
          const newDepartment=new Department();
          newDepartment.departmentName=departmentName;
          return this.departmentRepository.create(newDepartment);
       }
       async getAllDepartment():Promise<Department[]>{
                 return this.departmentRepository.findMany();
       }

       async getDepartmentById(id:number):Promise<Department>{
             return this.departmentRepository.findDeptById(id);
       }
       async getEmployeebyDeptId(id:number):Promise<Department>{
          return this.departmentRepository.getAllEmployeeByDeptId(id);
       }
       async updateDepartment(id:number,updateDepartmentDto:UpdateDepartmentDto){
        const existingDept=await this.departmentRepository.findDeptById(id);
        if(existingDept){
            existingDept.departmentName=updateDepartmentDto.departmentName;
            await this.departmentRepository.update(id,existingDept);
        }
       }       
    
       async deleteDepartment(id:number):Promise<void>{
        const existingDept=await this.departmentRepository.findDeptById(id);
        if(existingDept){
            logger.warn(`Deleting department $(id)`);
            await this.departmentRepository.remove(existingDept);
           // await this.employeeRepository.delete(id);
       }
       }

       async softRemove(id:number):Promise<void>{
        const existingDept=await this.departmentRepository.findDeptById(id);
        if(existingDept){
            logger.warn(`Deleting department $(id)`);
            await this.departmentRepository.softremove(existingDept);

   }}
}