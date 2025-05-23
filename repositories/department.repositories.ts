import { Repository } from "typeorm";
import Department from "../entities/department.entity";
import Employee from "../entities/employee.entity";

export class DepartmentRepository{
    constructor(private repository:Repository<Department>){}   
    async create(department:Department):Promise<Department>{
        return this.repository.save(department);
    }

    async findMany():Promise<Department[]>{
        return this.repository.find();
    }
    
  
    async findDeptById(id:number):Promise<Department | null>{
        return this.repository.findOneBy({id});
    }

     async getAllEmployeeByDeptId(id:number):Promise<Department>{
            return await this.repository.findOne(
                {   where:{id},relations:{
                    employee:true
                } }
            );
        }
    async update(id:number,department:Department):Promise<void>{
        await this.repository.save({id, ...department})  //await this.repository.save({id,name:employee.name,email:employee.email})
    }
    

    async delete(id:number):Promise<void>{
              await this.repository.delete(id)
    }
  
    async remove(department:Department):Promise<void>{
        await this.repository.remove(department)
    }
    async softremove(department:Department):Promise<void>{
        await this.repository.softRemove(department)
    }
}
