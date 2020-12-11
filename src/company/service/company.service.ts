import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as lodash from 'lodash';

import { CompanyE } from '../modules/company.entity';
import { CompanyI } from '../modules/company.interface';
import { CreateCompanyDto } from '../modules/createCompany.dto';
import { UpdateCompanyDto } from '../modules/updateCompany.dto';
import { UserTokenI } from 'src/token/modules/user_token.inteface';
import { UserE } from 'src/user/modules/user.entity';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class CompanyService {

  constructor(
    @InjectRepository(CompanyE)
    private companyRepository: Repository<CompanyE>,
    private userSerivce: UserService
  ) {}

  async creatCompany(createCompanyDto: CreateCompanyDto, userToken: UserTokenI) : Promise<CompanyI> {
    const user = await this.userSerivce.find(userToken.userid)
    const company = lodash.assignIn(createCompanyDto, {user: [user]})    
    return await this.companyRepository.save(company)
  }

  updateCompany(updateCompany: UpdateCompanyDto): Promise<UpdateResult | CompanyI> {
    const {id, ...company} = updateCompany
    return this.companyRepository.update(id, company)
  }

  async find(id: string): Promise<CompanyI> {
    return await this.companyRepository.findOne(id);
  }

  async findAll(userToken: UserTokenI): Promise<CompanyI[]> {
    return await this.companyRepository.createQueryBuilder('company')
      .leftJoinAndSelect('company.user', 'user')
      .where('user.id = :id', { id: userToken.id})
      .orderBy('company.id', 'DESC')
      .getMany()
  }

  async delete(id: string): Promise<boolean> {
    await this.companyRepository.delete(id)
    return true
  }
}
