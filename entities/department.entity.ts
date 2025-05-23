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
  OneToMany
} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Employee from "./employee.entity";
@Entity()
class Department extends AbstractEntity {

  @Column({unique:true})
  departmentName: string;

   @OneToMany(()=>Employee,(employee)=>employee.department)
   employee:Employee[];
}


export default Department;
