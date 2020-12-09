import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '../modules/dto/createUser.dto';
import { RoleEnum } from '../modules/enum/user.enum';
import { UserI } from '../modules/user.interface';
import { UserService } from '../service/user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("signin")
    createUser(@Body() user: CreateUserDto): Promise<UserI> {
        return this.userService.creatUser(user, RoleEnum.USER);
    }

    @Get("all_users")
    findAll(): Promise<UserI[]> {       
        return this.userService.findAll();
    }

    @Get("profile")
    find(@Body() id: string): Promise<UserI> {
        return this.userService.find(id);
    }
}
