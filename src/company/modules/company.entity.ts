import { UserE } from 'src/user/modules/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class CompanyE {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ readonly: false, unique: true })
  name: string;

  @Column({ readonly: false })
  address: string;

  @Column({ readonly: false })
  serviceOfActivity: string;

  @Column({ readonly: false })
  numberOfEmployees: number;

  @Column({ readonly: false, default: 'New company' })
  description: string;

  @Column({ readonly: false })
  type: string;

  @ManyToMany(() => UserE, user => user.company)
  @JoinTable()
  user: UserE[];
}