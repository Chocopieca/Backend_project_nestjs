import { Controller, Post, Get, Body, Headers, ValidationPipe, Query, Patch, UseGuards, Delete, Header } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';


import { GetUser } from 'src/components/decorators/get-user.decorator';
import { UserTokenI } from 'src/token/modules/user_token.inteface';
import { TokenService } from 'src/token/token.service';
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
  
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    ) {}

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
  @UseGuards(AuthGuard())
  async changePassword(
    @GetUser() user: UserTokenI,
    @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto
  ): Promise<boolean> {
    return await this.authService.changePassword(user.userid, changePasswordDto)
  }

  @Delete('/logout')
  @UseGuards(AuthGuard())
  async logout(
    @GetUser() user: UserTokenI,
    @Headers("authorization") header
  ): Promise<boolean> {
    await this.authService.logout(user, header.slice(7))
    return true
  }
}
