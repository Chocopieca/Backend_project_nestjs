import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from 'src/user/modules/dto/createUser.dto';
import { CompanyI } from '../modules/company.interface';
import { CreateCompanyDto } from '../modules/createCompany.dto';
import { CompanyService } from '../service/company.service';
import { AuthService } from 'src/auth/service/auth.service';
import { UserService } from 'src/user/service/user.service';
import { GetUser } from 'src/components/decorators/get-user.decorator';
import { UserTokenI } from 'src/token/modules/user_token.inteface';
import { UpdateCompanyDto } from '../modules/updateCompany.dto';

@ApiTags("/company")
@Controller("/company")
export class CompanyController {

  constructor(
    private readonly companyService: CompanyService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    ) {}

  @Post("/create_comp")
  @UseGuards(AuthGuard())
  createCompany(
    @GetUser() user: UserTokenI,
    @Body() comp: CreateCompanyDto
    ): Promise<CompanyI> {
    return this.companyService.creatCompany(comp, user);
  }

  @Get("/all_company")
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: UserTokenI): Promise<CompanyI[]> {       
    return this.companyService.findAll(user);
  }

  @Get("/:id")
  @UseGuards(AuthGuard())
  find(@Param('id') id: string): Promise<CompanyI> {
    return this.companyService.find(id);
  }

  @Patch("/update")
  @UseGuards(AuthGuard())
  update(
    @Body() updateCompanyDto: UpdateCompanyDto 
  ): Promise<CompanyI> {
    this.companyService.updateCompany(updateCompanyDto);
    return this.companyService.find(updateCompanyDto.id)
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard())
  async delete(@Param('id') id:string): Promise<boolean> {
    await this.companyService.delete(id)
    return true
  }
}
