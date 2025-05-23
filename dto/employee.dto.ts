import { IsDate, IsDateString, IsEmail, IsEnum, isNotEmpty, IsNotEmpty, isNumber, IsNumber, isString, IsString,MinLength, validate, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./address.dto";
import { Type } from "class-transformer";
import { EmployeeRole, Status } from "../entities/employee.entity";
import { CreateDepartmentDto } from "./department.dto";
export class CreateEmployeeDto {
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
  @IsString()
  @MinLength(5)
  password:string;

  @IsNotEmpty()
  @IsString()
  employeeID:string

  @IsEnum(EmployeeRole)
  role:EmployeeRole


  @IsNumber()
  experience:number

  @IsDateString()
  dateOfJoining:Date


  @IsNotEmpty()
  @IsEnum(Status)
  status:Status
   
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsNotEmpty()
  @IsNumber()
  departmentId:number
}