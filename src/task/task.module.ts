import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
