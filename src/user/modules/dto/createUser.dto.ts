import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsNotEmpty} from 'class-validator'
import { PositionEnum, RoleEnum } from '../enum/user.enum';

export class CreateUserDto {
    id?: string;
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    phoneNumber: string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    firstName: string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    lastName: string;
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    nickname: string;
    @IsString()
    @ApiProperty()
    description: string;
    @IsNotEmpty()
    @IsEnum(PositionEnum)
    @ApiProperty()
    position: string;

    role: string;
  }