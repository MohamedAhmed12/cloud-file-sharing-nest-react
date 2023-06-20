import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { LoginUserDTO } from './dtos/login-user.dto';
import { HttpException } from '@nestjs/common';
import { RegisterUserDTO } from './dtos/register-user.dto';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User])
    users() {
        return this.userService.get();
    }

    @Mutation(() => User)
    async login(@Args('data') data: LoginUserDTO): Promise<User | HttpException> {
        return this.userService.login(data);
    }

    @Mutation(() => User)
    async register(@Args('data') data: RegisterUserDTO): Promise<User | HttpException> {
        return this.userService.register(data);
    }
}
