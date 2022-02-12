import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ name: 'username' })
  username: string;
  @ApiProperty({ name: 'password' })
  password: string;
}
