import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ name: 'username' })
  username: string;
  @ApiProperty({ name: 'password' })
  password: string;
  @ApiProperty({ name: 'name' })
  name: string;
  @ApiProperty({ name: 'phone' })
  phone: string;
  avatar: string;
}
