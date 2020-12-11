import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as lodash from 'lodash'
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from '../modules/dto/createUser.dto';
import { UserE } from '../modules/user.entity';
import { UserI } from '../modules/user.interface';
import { RoleEnum } from '../modules/enum/user.enum';
import { UserTokenI } from 'src/token/modules/user_token.inteface';

@Injectable()
export class UserService {
    private readonly saltRound = 10;

    constructor(
        @InjectRepository(UserE)
        private userRepository: Repository<UserE>
    ) {}

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRound);
        return await bcrypt.hash(password, salt);
    }

    async creatUser(createUserDto: CreateUserDto, role: RoleEnum): Promise<UserI> {
        const hash = await this.hashPassword(createUserDto.password)
        
        const hashUser = lodash.assignIn(createUserDto, { password: hash, role });
        return this.userRepository.save(hashUser)
    }

    async find(id: string): Promise<UserI> {
        return await this.userRepository.findOne(id);
    }

    async findAll(): Promise<UserI[]> {
        return this.userRepository.find();
    }

    async findByEmail(email: string): Promise<UserI> {
        return this.userRepository.findOne({ email })
    }

    async updateUser(id?: string, payload?: Partial<UserI>, user?: UserI) {
        if(payload) {
            return await this.userRepository.update(id, {password: payload.password})
        } else if(user) {
            return await this.userRepository.update(id, user)
        }
    }

    async delete(id: string): Promise<boolean> {
        await this.userRepository.delete(id)
        return true
    }

    async save(createUserDto: CreateUserDto): Promise<UserI> {
        return await this.userRepository.save(createUserDto)
    }
}
