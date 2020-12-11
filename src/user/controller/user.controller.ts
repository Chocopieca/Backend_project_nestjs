import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/components/decorators/get-user.decorator';
import { UserTokenI } from 'src/token/modules/user_token.inteface';

import { CreateUserDto } from '../modules/dto/createUser.dto';
import { RoleEnum } from '../modules/enum/user.enum';
import { UserI } from '../modules/user.interface';
import { UserService } from '../service/user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/createUser")
    createUser(@Body() user: CreateUserDto): Promise<UserI> {
        return this.userService.creatUser(user, RoleEnum.USER);
    }

    @Get()
    @UseGuards(AuthGuard())
    findAll(): Promise<UserI[]> {       
        return this.userService.findAll();
    }

    @Get("/:id")
    @UseGuards(AuthGuard())
    find(@Param('id') id: string): Promise<UserI> {
        return this.userService.find(id);
    }

    @Patch("/update")
    @UseGuards(AuthGuard())
    async update(
        @Body() user: UserI
        ): Promise<UserI> {
        await this.userService.updateUser(user.id, null, user);
        return await this.userService.find(user.id)
    }

    @Delete('/delete/:id')
    @UseGuards(AuthGuard())
    async delete(@Param('id') id: string): Promise<boolean> {
        return await this.userService.delete(id)
    }
}
