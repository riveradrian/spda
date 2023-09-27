import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8, {
    message: 'Password is too short (Min 8 characters)',
  })
  password: string;

  @Field()
  @MinLength(2)
  name: string;

  @IsEmpty()
  authenticated: boolean;

  @IsEmpty()
  created_date: Date;

  @IsEmpty()
  updated_date: Date;
}
