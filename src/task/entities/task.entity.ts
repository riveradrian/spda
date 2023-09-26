import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => Int, { description: '' })
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  status: string;
}
