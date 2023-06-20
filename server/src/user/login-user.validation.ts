import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

@InputType()
export class LoginUserValidation {
    @IsEmail()
    @IsNotEmpty()
    @Field()
    email: string;

    @IsNotEmpty()
    @MaxLength(23)
    @MinLength(8)
    @Field()
    password: string;
}