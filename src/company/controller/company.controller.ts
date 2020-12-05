import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateUserDto } from 'src/user/modules/dto/createUser.dto';
import { CompanyI } from '../modules/company.interface';
import { CreateCompanyDto } from '../modules/createCompany.dto';
import { CompanyService } from '../service/company.service';

@Controller()
export class CompanyController {

  constructor(private readonly companyService: CompanyService) {}

  @Post("create_comp")
  createCompany(@Body() comp: CreateCompanyDto): Promise<CompanyI> {
      return this.companyService.creatCompany(comp);
  }

  // @Post("update_comp")
  // updateCompany(@Body() comp: CompanyDto): Promise<CompanyI> {
  //   return this
  // }

  @Get("all_company")
  findAll(): Promise<CompanyI[]> {       
      return this.companyService.findAll();
  }

  @Get("company")
  find(@Body() id: string): Promise<CompanyI> {
      return this.companyService.find(id);
  }
}
