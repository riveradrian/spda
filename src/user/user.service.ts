import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const newData = {
      ...createUserInput,
      authenticated: false,
      created_date: new Date(),
      updated_date: new Date(),
    };
    const user = this.userRepository.create(newData);
    await this.userRepository.save(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['tasks'],
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: ['tasks'],
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: email },
      relations: ['tasks'],
    });
  }

  async update(
    id: number,
    updateUserInput: Partial<UpdateUserInput>,
  ): Promise<User> {
    const updateUser = {
      ...updateUserInput,
      updated_date: new Date(),
    };
    await this.userRepository.update(id, updateUser);
    return this.findOne(id);
  }
}
