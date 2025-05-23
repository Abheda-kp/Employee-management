import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateDepartmentDto {

  @IsNotEmpty()
  @IsString()
  departmentName: string;
}