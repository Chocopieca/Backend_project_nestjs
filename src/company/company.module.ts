import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyService } from './service/company.service';
import { CompanyController } from './controller/company.controller';
import { CompanyE } from './modules/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyE])
  ],
  providers: [CompanyService],
  controllers: [CompanyController]
})
export class CompanyModule {}
