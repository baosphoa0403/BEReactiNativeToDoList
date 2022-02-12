import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { StatusEnum } from 'src/utils/status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private taskRepo: TaskRepository) {}

  async addTask(user: User, taskDto: CreateTaskDto) {
    const task = await this.taskRepo.create({ ...taskDto, user: user });
    return await this.taskRepo.save(task);
  }

  async getAll(user: User): Promise<Task[]> {
    return await this.taskRepo.find({ user });
  }

  async changeStatus(
    user: User,
    id: number,
    status: StatusEnum,
  ): Promise<Task> {
    const task = await this.taskRepo.findOne({ id, user });
    if (!task)
      throw new HttpException('task not exist', HttpStatus.BAD_REQUEST);
    task.status = status;
    return await this.taskRepo.save(task);
  }

  async deleteTask(user: User, id: number): Promise<string> {
    const task = await this.taskRepo.findOne({ id, user });
    if (!task)
      throw new HttpException('Task not exist', HttpStatus.BAD_REQUEST);
    await this.taskRepo.delete(task);
    return 'success';
  }
}
