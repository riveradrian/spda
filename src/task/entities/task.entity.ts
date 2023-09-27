import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmpty, IsOptional } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'task' })
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: '' })
  id: number;

  @Column()
  @Field()
  title: string;

  @Column({ nullable: true })
  @IsOptional()
  @Field()
  description?: string;

  @Column()
  @Field()
  status: string;

  @Column()
  @Field()
  userId: number;

  @Column()
  @Field()
  @IsEmpty()
  created_date: Date;

  @Column()
  @Field()
  @IsEmpty()
  updated_date: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  @Field(() => User)
  user: User;
}
