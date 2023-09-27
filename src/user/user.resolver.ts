import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/graphqlAuthGuard';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  // @UseGuards(GraphqlAuthGuard)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(GraphqlAuthGuard)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(GraphqlAuthGuard)
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Mutation(() => User)
  @UseGuards(GraphqlAuthGuard)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }
}
