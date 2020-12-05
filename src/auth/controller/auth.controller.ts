import { Controller, Post, Get, Body, ValidationPipe, Query, Patch, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/components/decorators/get-user.decorator';

import { CreateUserDto } from 'src/user/modules/dto/createUser.dto';
import { ReadableUserI } from 'src/user/modules/readable-user.interface';
import { UserI } from 'src/user/modules/user.interface';
import { ConfirmAccountDto } from '../modules/confirmAccount.dto';
import { ChangePasswordDto } from '../modules/dto/change-password.dto';
import { ForgotPassDto } from '../modules/dto/forgot-pass.dto';
import { SignInDto } from '../modules/dto/signing.dto';
import { AuthService } from '../service/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  async signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<boolean> {
    return this.authService.signUp(createUserDto)
  }

  @Get('/confirm')
  async confirm(@Query(new ValidationPipe()) query: ConfirmAccountDto) {
    await this.authService.confirm(query.token)
    return true
  }

  @Post('/signIn')
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<ReadableUserI> {
    return await this.authService.signIn(signInDto);
  }

  @Post('/forgotPassword')
  async forgotPasswrod(@Body(new ValidationPipe()) forgotPasswordDto: ForgotPassDto): Promise<boolean> {
    return await this.authService.forgotPassword(forgotPasswordDto)
  }

  @Patch('/changePassword')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @GetUser() user: UserI,
    @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto
  ): Promise<boolean> {
    console.log('Getusers user: ===>',user);
    return await this.authService.changePassword(user.id, changePasswordDto)
  }

  @Delete('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(
    @GetUser() user: UserI,
  ): Promise<boolean> {
    // await this.authService.logout(user, token)
    return true
  }
}
