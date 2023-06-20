import { ObjectId } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';
import { config } from 'src/shared/config';
import { sign } from 'jsonwebtoken';

@ObjectType()
export class UserDTO extends User {
  @Field()
  auth_token?: string;
}

export interface AuthToken {
  id: ObjectId;
}
