import { IsString, IsNotEmpty, IsNumber, } from 'class-validator'

export class UpdateCompanyDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  address: string;
  @IsString()
  serviceOfActivity: string;
  @IsNumber()
  numberOfEmployees: number;
  @IsString()
  description: string;
  @IsString()
  type: string;
}