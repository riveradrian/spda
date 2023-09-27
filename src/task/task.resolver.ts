import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { User } from 'src/user/entities/user.entity';
import { GraphqlAuthGuard } from 'src/auth/graphqlAuthGuard';
import { UnauthorizedException, UseGuards } from '@nestjs/common';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  @UseGuards(GraphqlAuthGuard)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<Task> {
    return await this.taskService.create(createTaskInput);
  }

  @Query(() => [Task], { name: 'tasks' })
  @UseGuards(GraphqlAuthGuard)
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Query(() => Task, { name: 'task' })
  @UseGuards(GraphqlAuthGuard)
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Mutation(() => Task)
  @UseGuards(GraphqlAuthGuard)
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
    @Context() context,
  ): Promise<Task> {
    const task = await this.taskService.findOne(updateTaskInput.id);
    if (task.userId !== context.req.user.userId) {
      throw new UnauthorizedException(
        'You dont have permissions for update this task',
      );
    }
    return this.taskService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation(() => String)
  @UseGuards(GraphqlAuthGuard)
  async removeTask(
    @Args('id', { type: () => Int }) id: number,
    @Context() context,
  ): Promise<string> {
    const task = await this.taskService.findOne(id);
    if (task.userId !== context.req.user.userId) {
      throw new UnauthorizedException(
        'You dont have permissions for remove this task',
      );
    }
    return this.taskService.remove(id);
  }

  @ResolveField(() => User)
  user(@Parent() task: Task): Promise<User> {
    return this.taskService.getUser(task.userId);
  }
}
