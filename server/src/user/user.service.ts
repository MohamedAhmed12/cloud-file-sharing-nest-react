import { compareSync } from 'bcryptjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { LoginUserDTO } from './dtos/login-user.dto';
import { RegisterUserDTO } from './dtos/register-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly user: Repository<User>
    ) {}

    async get(): Promise<User[]> {
        return await this.user.find();
    }

    async login(data: LoginUserDTO): Promise<User | HttpException> {
        const user = await this.user.findOne({
            where: { email: data.email },
        });

        if (!user || !compareSync(data.password, user.password)) {
            return new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    async register({ email, name, password, password_confirmation }: RegisterUserDTO): Promise<User | HttpException> {
        if (password != password_confirmation) {
            return new HttpException('Password and password_confirmation should match', HttpStatus.BAD_REQUEST);
        }

        const count = await this.user.findOne({
            where: { email }
        });

        if (count) {
            return new HttpException('email already exists, please pick up another one', HttpStatus.BAD_REQUEST);
        }

        let user = await this.user.create({ email, name, password });
        return await this.user.save(user);
    }
}
