import { IsString, IsDateString} from 'class-validator'
import { UserE } from 'src/user/modules/user.entity'

export class CreateUserTokenDto {
  @IsString()
  token: string
  @IsString()
  user: string
  @IsDateString()
  created: string
}