import { update } from "lodash";
import { UserTokenE } from "src/token/modules/user_token.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm";
import { StatusEnum } from "./status.enum";
import { PositionEnum, RoleEnum } from "./enum/user.enum";
import { CompanyE } from "src/company/modules/company.entity";

@Entity()
export class UserE {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({readonly: false, unique: true})
    email: string;
    
    @Column({readonly: false})
    password: string;
    
    @Column({readonly: false})
    phoneNumber: string;
    
    @Column({readonly: false})
    firstName: string;
    
    @Column({readonly: false})
    lastName: string;
    
    @Column({readonly: false})
    nickname: string;
    
    @Column({readonly: false, default: 'New user'})
    description: string;
    
    @Column({
        type: 'enum',
        enum: PositionEnum,
        default: PositionEnum.DEV,
    })
    position: string;
    
    @Column({
        type: 'enum',
        enum: RoleEnum,
        default: RoleEnum.USER,
    })
    role: string;

    @OneToMany(() => UserTokenE, token => token.id, { cascade: true })
    token: UserTokenE[]

    @ManyToMany(() => CompanyE, company => company.user)
    company: string[]

    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.pending,
    })
    status: string
}