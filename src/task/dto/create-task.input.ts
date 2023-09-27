import { InputType, Field } from '@nestjs/graphql';
import { IsEmpty, IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @MinLength(3)
  @Field()
  title: string;

  @IsOptional()
  @Field()
  description?: string;

  @Field()
  status: string;

  @Field()
  userId: number;

  @IsEmpty()
  created_date: Date;

  @IsEmpty()
  updated_date: Date;
}
