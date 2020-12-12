import { BadRequestException, Injectable, MethodNotAllowedException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import moment = require ('moment');
import * as bcrypt from 'bcrypt';
import * as lodash from 'lodash';

import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/user/modules/dto/createUser.dto';
import { UserService } from 'src/user/service/user.service';
import { UserI } from 'src/user/modules/user.interface';
import { RoleEnum } from 'src/user/modules/enum/user.enum';
import { MailService } from 'src/mail/service/mail.service';
import { StatusEnum } from 'src/user/modules/status.enum';
import { SignInDto } from '../modules/dto/signing.dto';
import { ReadableUserI } from 'src/user/modules/readable-user.interface';
import { userSensitiveFieldsEnum } from 'src/user/modules/enum/protected-fields.enum';
import { tokenPayloadI } from '../modules/token-payload.interface';
import { ForgotPassDto } from '../modules/dto/forgot-pass.dto';
import { ChangePasswordDto } from '../modules/dto/change-password.dto';
import { UserTokenI } from 'src/token/modules/user_token.inteface';

@Injectable()
export class AuthService {
  private readonly clientAppUrl: string

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly cofigService: ConfigService,
    private readonly mailService: MailService,
  ) {
    this.clientAppUrl = this.cofigService.get<string>('FE_APP_URL')
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.creatUser(createUserDto, RoleEnum.USER)
    await this.sendConfirmation(user)
    return user;
  }

  async signIn({email, password}: SignInDto): Promise<ReadableUserI> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare( password, user.password))) {
      const token = await this.createToken(user);
      const readableUser = user as ReadableUserI;
      readableUser.accessToken = token;
      return lodash.omit<any>(readableUser, Object.values(userSensitiveFieldsEnum)) as ReadableUserI;
    }
    throw new BadRequestException('Wrong password or email')
  }

  async confirm(token: string): Promise<UserI>{
    const data = await this.verifyToken(token) as tokenPayloadI;
    const user = await this.userService.find(data.id)
    
    await this.tokenService.delete(data.id, token);

    if (user && user.status === StatusEnum.pending) {
      user.status = StatusEnum.active;
      return this.userService.save(user);
    }
    throw new BadRequestException('Confirmation error');
  }

  async forgotPassword(forgotPasswordDto: ForgotPassDto): Promise<boolean> {
    const user = await this.userService.findByEmail(forgotPasswordDto.email)
    if (!user) {
      throw new BadRequestException('Not found this user')
    }
    const token = this.createToken(user);
    const forgotLink = `${this.clientAppUrl}/auth/forgotPassword?token=${token}`;
    // await this.mailService.send({
    //     from: this.cofigService.get<string>('JS_CODE_MAIL'),
    //     to: user.email,
    //     subject: 'Verify User',
    //     html: `
    //     <h3>Hello ${user.firstName}!</h3>
    //     <p>Please use this <a href="${forgotLink}">link</a> to reset your password.</p>
    //     `,
    // })
    return true
  }

  async changePassword(userid: string, changePasswordDto: ChangePasswordDto): Promise<boolean> {
    const password = await this.userService.hashPassword(changePasswordDto.password);
    await this.userService.updateUser(userid, {password});
    await this.tokenService.deleteall(userid);
    return true;
  }

  async logout(user: UserTokenI, token): Promise<boolean> {
    await this.tokenService.delete(user.id, token)
    return true
  }

  async verifyToken(token: string): Promise<tokenPayloadI> {
    try {       
      const data = await this.jwtService.verify(token) as tokenPayloadI
      const tokenExist = await this.tokenService.exists(data.id, token);
      
      if(tokenExist) {
        return data;
      }
      throw new UnauthorizedException();
    } catch(err) {
      throw new UnauthorizedException(err);
    }
  }
  
  // ------------------------------------------
  private async createToken(user: UserI, withStatusCheck: boolean = true): Promise<string> {
    if(withStatusCheck && (user.status !== StatusEnum.active )){
      throw new MethodNotAllowedException("User is not active")
    }
    // const expiresIn = 60 * 60 * 2;
    const expiresIn = 60;
    const tokenPayload: tokenPayloadI = {
      id: user.id,
      status: user.status,
      role: user.role,
      userid: user.id
    };
    const token = await this.generateToken(tokenPayload, { expiresIn });
    const expireAt = moment()
    .add(2, 'h')
    .toISOString()
    
    await this.tokenService.create({
      token, 
      id: user.id, 
      created: expireAt,
      userid: user.id
    })
    return token 
  }

  private async generateToken(data: tokenPayloadI, option?: SignOptions): Promise<string> {
    return this.jwtService.sign(data, option)
  }

  private async sendConfirmation(user: UserI) {
    const token = await this.createToken(user, false)
    const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`;
    // await this.mailService.send({
    //   from: this.cofigService.get<string>('JS_CODE_MAIL'),
    //   to: user.email,
    //   subject: 'Verify User',
    //   html: `
    //   <h3>Hello ${user.firstName}!</h3>
    //   <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
    //   `,
    // });
  }


}
