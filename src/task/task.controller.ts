import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import { User } from 'src/user/user.entity';
import { StatusEnum } from 'src/utils/status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('task')
@ApiTags('Tasks')
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(
    @GetUser() user: User,
    @Body() taskDto: CreateTaskDto,
  ): Promise<Task> {
    return await this.taskService.addTask(user, taskDto);
  }

  @Get()
  async getAll(@GetUser() user: User): Promise<Task[]> {
    return await this.taskService.getAll(user);
  }

  @Patch('/:id')
  @ApiQuery({ name: 'status', enum: StatusEnum })
  async changeStatus(
    @GetUser() user: User,
    @Query('status') status: StatusEnum,
    @Param('id') id: number,
  ): Promise<Task> {
    return await this.taskService.changeStatus(user, id, status);
  }

  @Delete('/:id')
  async deleteTask(
    @GetUser() user: User,
    @Param('id') id: number,
  ): Promise<string> {
    return this.taskService.deleteTask(user, id);
  }
}
