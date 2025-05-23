import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested ,MinLength,IsDateString,IsEnum} from "class-validator";
import { CreateAddressDto } from "./address.dto";
import { Type } from "class-transformer";
import { UpdateAddressDto } from "./updateaddr.dto";
import { UpdateDepartmentDto } from "./updateDept.dto";
import { Status } from "../entities/employee.entity";

export class UpdateEmployeeDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  employeeID:string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
    password:string;

  @IsNumber()
    experience:number
  
  @IsDateString()
    dateOfJoining:Date
  
  
  @IsNotEmpty()
  @IsEnum(Status)
    status:Status
  

  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address: UpdateAddressDto;

  @IsNotEmpty()
  @IsNumber()
  departmentId:number;

}
