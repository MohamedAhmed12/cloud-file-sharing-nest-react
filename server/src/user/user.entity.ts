import { Field, ID, ObjectType } from '@nestjs/graphql';
import { sign } from 'jsonwebtoken';
import { config } from 'src/shared/config';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column('text')
  @Field()
  name: string;

  @Column('text', { unique: true })
  @Field()
  email: string;

  @Column('text')
  password: string;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @CreateDateColumn()
  @Field()
  updated_at: Date;

  private get AuthToken(): string | undefined {
    const { id, name } = this;
    return sign({ id, name }, config.JWT_TOKEN, {
      expiresIn: config.JWT_TOKEN_EXPIRATION,
    });
  }
}
