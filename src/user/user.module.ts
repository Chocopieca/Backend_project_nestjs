import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { UserE } from './modules/user.entity';
import { passportModul, jwtModule} from 'src/passport.root'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserE]),
    passportModul,
    jwtModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
