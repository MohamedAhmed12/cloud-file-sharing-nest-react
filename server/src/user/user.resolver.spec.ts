import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { compareSync, hashSync,genSaltSync } from 'bcryptjs';
import { RegisterUserDTO } from './dtos/register-user.dto';
import { createDbConnection } from '../utils/db';

describe('UserResolver', () => {
    let resolver: UserResolver;
    let userService: UserService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...createDbConnection([User])],
            providers: [UserResolver, UserService],
        }).compile();

        resolver = module.get<UserResolver>(UserResolver);
        userService = module.get<UserService>(UserService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('should register user', () => {
        let createdUser: User;
        const registerData: RegisterUserDTO = {
            "email": "test@gmail.com",
            "name": "first name",
            "password": "123456789",
            "password_confirmation": "123456789",
        }

        it('should create user', async () => {            
            await userService.register(registerData);

            createdUser = await userRepository.findOne({
                where: { email: registerData.email }
            });

            expect(createdUser).toEqual({
                "id": 1,
                "email": registerData.email,
                "name": registerData.name,
                "password": createdUser.password,
                "created_at": createdUser.created_at,
                "updated_at": createdUser.updated_at,
            });
        });

        it('should hash password', async () => {
            expect(compareSync(registerData.password, createdUser.password)).toBeTruthy();
        });
    });
});
