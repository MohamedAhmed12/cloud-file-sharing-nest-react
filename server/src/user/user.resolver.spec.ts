import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { compareSync, hashSync, genSaltSync } from 'bcryptjs';
import { RegisterUserDTO } from './dtos/register-user.dto';
import { createDbConnection } from '../utils/db';
import { LoginUserDTO } from './dtos/login-user.dto';
import { UserService } from './user.service';

describe('UserResolver', () => {
    let resolver: UserResolver;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...createDbConnection([User])],
            providers: [UserResolver, UserService],
        }).compile();

        resolver = module.get<UserResolver>(UserResolver);
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
            await resolver.register(registerData);

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

    describe('should login user', () => {
        const loginData: LoginUserDTO = {
            "email": "test@gmail.com",
            "password": "123456789",
        }

        it('should login user', async () => {
            let createdUser = await userRepository.create({
                ...loginData,
                "name": "first name",
            });
            createdUser = await userRepository.save(createdUser);
            
            const response = await resolver.login(loginData);

            expect(response).toEqual({
                "id": 1,
                "email": loginData.email,
                "name": "first name",
                "password": createdUser.password,
                "created_at": createdUser.created_at,
                "updated_at": createdUser.updated_at,
            });
        })
    });
});
