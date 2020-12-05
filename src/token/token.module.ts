import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTokenE } from './modules/user_token.entity';
import { TokenService } from './token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTokenE])
  ],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
