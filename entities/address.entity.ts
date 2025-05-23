import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity()
class Address extends AbstractEntity {
  @Column()
  line1: string;

  @Column()
  pincode: string;

  @Column()
  houseNo:string;

  @Column()
  line2:string

 @OneToOne(()=>Employee,{
    onDelete:'CASCADE'
   })
   @JoinColumn()
   employee:Employee;
   
}
export default Address;
