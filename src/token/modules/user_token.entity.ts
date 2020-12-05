import { CreateDateColumn, Column, Entity, PrimaryColumn, ManyToOne } from "typeorm";

import { UserE } from "src/user/modules/user.entity";

@Entity()
export class UserTokenE {
  @PrimaryColumn({unique: true})
  token: string;

  @ManyToOne(() => UserE, user => user.token)
  user: string

  @CreateDateColumn()
  created: string
}