import { UserTokenE } from "src/token/modules/user_token.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { StatusEnum } from "./status.enum";
import { PositionEnum, RoleEnum } from "./user.enum";

@Entity()
export class UserE {
    @PrimaryGeneratedColumn()
    id: string;

    // unique????
    @Column({readonly: false})
    email: string;
    
    @Column({readonly: true})
    password: string;
    
    @Column({readonly: false})
    phoneNumber: string;
    
    @Column({readonly: true})
    firstName: string;
    
    @Column({readonly: true})
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

    @OneToMany(() => UserTokenE, token => token.user)
    token: UserTokenE[]

    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.pending,
    })
    status: string
}