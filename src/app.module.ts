import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { configModule } from './config.root';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';
import { TokenCheck } from './components/middleware/loger.middleware';
import { UserController } from './user/controller/user.controller';
import { CompanyController } from './company/controller/company.controller';
import { AuthController } from './auth/controller/auth.controller';

@Module({
  imports: [
    configModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: ['dist/**/*.entity{ .ts,.js}'],
      autoLoadEntities: true,
      synchronize: true
    }),
    UserModule,
    CompanyModule,
    AuthModule,
    TokenModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenCheck).forRoutes(UserController, CompanyController, AuthController)
  }
}
