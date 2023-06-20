import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { LoginUserValidation } from './login-user.validation';

@InputType()
export class RegisterUserValidation extends LoginUserValidation{
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
