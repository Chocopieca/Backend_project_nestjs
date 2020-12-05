import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { assignIn } from 'lodash';

import { CompanyE } from '../modules/company.entity';
import { CompanyI } from '../modules/company.interface';
import { CreateCompanyDto } from '../modules/createCompany.dto';
import { UpdateCompanyDto } from '../modules/updateCompany.dto';

@Injectable()
export class CompanyService {

  constructor(
    @InjectRepository(CompanyE)
    private companyRepository: Repository<CompanyE>
  ) {}

  async creatCompany(createCompanyDto: CreateCompanyDto) : Promise<CompanyI> {
    return this.companyRepository.save(createCompanyDto)
  }

  // async updateCompany(updateCompany: UpdateCompanyDto): Promise<CompanyI> {
  //   return await this.companyRepository.update(updateCompany.id, updateCompany)
  // }

  async find(id: string): Promise<CompanyI> {
    return await this.companyRepository.findOne(id);
  }

  async findAll(): Promise<CompanyI[]> {
    return this.companyRepository.find();
  }
}
