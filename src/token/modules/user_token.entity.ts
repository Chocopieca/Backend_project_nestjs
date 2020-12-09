import { CreateDateColumn, Column, Entity, PrimaryColumn, ManyToOne, JoinTable, PrimaryGeneratedColumn } from "typeorm";

import { UserE } from "src/user/modules/user.entity";

@Entity()
export class UserTokenE {
  @PrimaryColumn({unique: true})
  token: string;

  @ManyToOne(() => UserE, id => id.token)
  @JoinTable()
  id: string

  @CreateDateColumn()
  created: string

  @Column()
  userid: string;
}