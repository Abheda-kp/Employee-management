import Employee, { EmployeeRole } from "../entities/employee.entity";

export class JwtPayLoad{
    id:number;
    email:string;
    role:EmployeeRole;
}