import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyService } from './service/company.service';
import { CompanyController } from './controller/company.controller';
import { CompanyE } from './modules/company.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { configModule } from 'src/config.root';
import { jwtModule, passportModul } from 'src/passport.root';

@Module({
  imports: [
    configModule,    
    passportModul,
    jwtModule,
    TypeOrmModule.forFeature([CompanyE]),
    AuthModule,
    UserModule
  ],
  providers: [CompanyService],
  controllers: [CompanyController]
})
export class CompanyModule {}
