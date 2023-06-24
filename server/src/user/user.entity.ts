import { Field, ID, ObjectType } from '@nestjs/graphql';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { config } from '../shared/config';
import {
    BaseEntity,
    BeforeInsert,
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
    
    @Field()
    public get auth_token(): string | undefined {
      const { id, name } = this;
      return sign({ id, name }, config.JWT_TOKEN, {
          expiresIn: config.JWT_TOKEN_EXPIRATION,
      });
  }

    @BeforeInsert()
    async hashPass() {
        this.password = await hash(this.password, 12);
    }
}
