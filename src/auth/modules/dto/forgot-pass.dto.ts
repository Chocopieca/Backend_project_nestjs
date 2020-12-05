import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotPassDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string
}