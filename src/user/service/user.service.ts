import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as lodash from 'lodash'
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from '../modules/dto/createUser.dto';
import { UserE } from '../modules/user.entity';
import { UserI } from '../modules/user.interface';
import { RoleEnum } from '../modules/user.enum';

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

    async update(id: string, payload: Partial<UserI>) {
        return this.userRepository.update({id: id}, payload)
    }

    async save(createUserDto: CreateUserDto): Promise<UserI> {
        return await this.userRepository.save(createUserDto)
    }
}
