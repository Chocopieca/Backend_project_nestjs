import { IsString, IsNotEmpty, IsNumber, } from 'class-validator'

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsNotEmpty()
  serviceOfActivity: string;
  @IsNumber()
  @IsNotEmpty()
  numberOfEmployees: number;
  @IsString()
  description: string;
  @IsString()
  @IsNotEmpty()
  type: string;
}