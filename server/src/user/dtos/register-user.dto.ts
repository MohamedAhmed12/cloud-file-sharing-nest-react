import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { LoginUserDTO } from './login-user.dto';

@InputType()
export class RegisterUserDTO extends LoginUserDTO{
  @IsString()
  @IsNotEmpty()
  @MaxLength(23)
  @MinLength(8)
  @Field()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(23)
  @MinLength(8)
  @Field()
  password_confirmation: string;
}
