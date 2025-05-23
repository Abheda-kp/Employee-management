import { IsNotEmpty, IsString } from "class-validator";

export class UpdateAddressDto {
 
  @IsString()
  line1: string;

 
  @IsString()
  pincode: string;

  @IsNotEmpty()
  @IsString()
  line2:string

  @IsNotEmpty()
  @IsString()
  houseNo:string

}