import { Repository } from "typeorm";
import Employee from "../entities/employee.entity";

export class EmployeeRepository{
    constructor(private repository:Repository<Employee>){}   
    async create(employee:Employee):Promise<Employee>{
        return this.repository.save(employee);
    }

    async findMany():Promise<Employee[]>{
        return this.repository.find({
            relations:{
                address:true,
                department:true
            }
        });
    }
   
    async findById(id:number):Promise<Employee | null>{
        return this.repository.findOne({
            where:{id},
            relations:{
                address:true,
                department:true
            }
    });
    }

    async findByEmail(email:string):Promise<Employee | null>{
        return this.repository.findOneBy({email})
    }
    async update(id:number,employee:Employee):Promise<Employee>{
        return await this.repository.save({id, ...employee})  //await this.repository.save({id,name:employee.name,email:employee.email})
    }

    async delete(id:number):Promise<void>{
              await this.repository.delete(id)
    }
  
    async remove(employee:Employee):Promise<void>{
        await this.repository.remove(employee)
    }
    async softremove(employee:Employee):Promise<void>{
        await this.repository.softRemove(employee)
    }
}
