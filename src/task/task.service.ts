import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskInput: CreateTaskInput): Promise<Task> {
    const task = this.taskRepository.create(createTaskInput);
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
    await this.taskRepository.update(id, { ...updateTaskInput });
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    await this.taskRepository.delete({ id });
    return true;
  }
}
