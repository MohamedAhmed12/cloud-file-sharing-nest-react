import { compareSync } from 'bcryptjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

import { UserDTO } from './user.dto';

import { LoginUserValidation } from './login-user.validation';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async get(): Promise<User[]> {
    return await this.user.find();
  }

    async login(data: LoginUserValidation): Promise<UserDTO|HttpException>{
      const user = await this.user.findOneOrFail({
        where: { email: data.email },
      });

      if (!compareSync(data.password, user.password)) {
        return new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
      }

      return user;
    }
}
