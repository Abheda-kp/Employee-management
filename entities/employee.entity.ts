import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne
} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";
export enum EmployeeRole{
  UI='UI',
  UX='UX',
  DEVELOPER='DEVELOPER',
  HR='HR'
}

export enum Status{
     ACTIVE='ACTIVE',
     INACTIVE='INACTIVE',
     PROBATION='PROBATION'
}

@Entity()
class Employee extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  employeeID:string;

  @Column()
  dateOfJoining:Date

  @Column()
  experience:number

  @Column({
   type:'enum',
   enum:Status,
   default:Status.ACTIVE
  })
   status:Status

  @Column()
  name: string;

  @Column()
  age: number;

   @OneToOne(() =>Address,(address)=>address.employee,{
    cascade:true
   })
   
   address:Address

   @Column({default:"password"})
   password:string;
   

    @ManyToOne(() =>Department,(department)=>department.employee)

   department :Department;
   

   @Column({
    type:'enum',
    enum:EmployeeRole,
    default:EmployeeRole.DEVELOPER
   })
    role:EmployeeRole
}

export default Employee;
