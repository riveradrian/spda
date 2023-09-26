import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  status: string;
}
