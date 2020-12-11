import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt'

export const passportModul = PassportModule.register({ defaultStrategy: 'jwt' });
export const jwtModule = JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '2h' }
});