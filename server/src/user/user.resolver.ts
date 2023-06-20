import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDTO } from './user.dto';
import { LoginUserValidation } from './login-user.validation';
import { HttpException } from '@nestjs/common';
import { RegisterUserValidation } from './register-user.validation';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User])
    users() {
        return this.userService.get();
    }

    @Mutation(() => UserDTO)
    async login(@Args('data') data: LoginUserValidation): Promise<UserDTO | HttpException> {
        return this.userService.login(data);
    }

    @Mutation(() => UserDTO)
    async register(@Args('data') data: RegisterUserValidation): Promise<UserDTO | HttpException> {
        return this.userService.register(data);
    }
}
