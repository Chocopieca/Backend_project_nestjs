import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { UserTokenE } from './modules/user_token.entity';
import { CreateUserTokenDto } from './modules/user_token.dto'
import { UserTokenI } from './modules/user_token.inteface';
import { TokenDto } from 'src/auth/modules/dto/logout.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(UserTokenE)
    private userTokenRepository: Repository<UserTokenE>
  ) {}

  async create(CreateUserTokenDto: CreateUserTokenDto): Promise<UserTokenE> {
    return await this.userTokenRepository.save(CreateUserTokenDto);
  }

  async delete(userid: string, token: string): Promise<DeleteResult> {
    return await this.userTokenRepository.createQueryBuilder()
      .delete()  
      .from(UserTokenE)
      .where({id: userid})
      .andWhere('token = :token', {token})
      .execute()
  }

  async deleteall(userid: string): Promise<DeleteResult> {
    return await this.userTokenRepository.createQueryBuilder()
      .delete()  
      .from(UserTokenE)
      .where({id: userid})
      .execute()
  }

  async exists(userid: string, token: string): Promise<any> {
    const exists: UserTokenI = await this.userTokenRepository.createQueryBuilder()
      .where({id: userid})
      .andWhere('token = :token', {token})
      .getOne()
    if(exists) {
      return exists
    } else {
      throw new NotFoundException('Token not fined')
    }
  }
}
