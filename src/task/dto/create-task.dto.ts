import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ name: 'title' })
  title: string;
  @ApiProperty({ name: 'description' })
  description: string;
}
