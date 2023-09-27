import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmpty } from 'class-validator';
import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  authenticated: boolean;

  @Column()
  @Field()
  @IsEmpty()
  created_date: Date;

  @Column()
  @Field()
  @IsEmpty()
  updated_date: Date;

  @OneToMany(() => Task, (tasks) => tasks.user)
  @Field(() => [Task], { nullable: true })
  tasks?: Task[];
}
