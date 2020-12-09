import { IsString, IsDateString} from 'class-validator'
import { UserE } from 'src/user/modules/user.entity'

export class CreateUserTokenDto {
  @IsString()
  token: string
  @IsString()
  id: string
  @IsDateString()
  created: string
  @IsString()
  userid: string
}