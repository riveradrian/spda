import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private userService: UserService,
  ) {}

  async create(createTaskInput: CreateTaskInput): Promise<Task> {
    const newData = {
      ...createTaskInput,
      created_date: new Date(),
      updated_date: new Date(),
    };
    const task = this.taskRepository.create(newData);
    await this.taskRepository.save(task);
    return task;
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    return await this.taskRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateTaskInput: Partial<UpdateTaskInput>,
  ): Promise<Task> {
    const updateTask = {
      ...updateTaskInput,
      updated_date: new Date(),
    };
    await this.taskRepository.update(id, updateTask);
    return this.findOne(id);
  }

  async remove(id: number): Promise<string> {
    await this.taskRepository.delete({ id });
    return 'Task successfully deleted';
  }

  async getUser(userId: number): Promise<User> {
    return await this.userService.findOne(userId);
  }
}
