import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column('text')
  @Field()
  name:string;

  @Column('text', {unique: true})
  @Field()
  email: string

  @Column('text')
  password: string;

  @CreateDateColumn()
  @Field()
  created_at: Date;

  @CreateDateColumn()
  @Field()
  updated_at: Date;
}
