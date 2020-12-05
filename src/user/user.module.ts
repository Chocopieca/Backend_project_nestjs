import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { UserE } from './modules/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserE])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
