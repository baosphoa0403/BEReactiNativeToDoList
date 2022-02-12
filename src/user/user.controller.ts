import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { Public } from './jwt/public';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @Public()
  async signUp(@Body() user: UserDto): Promise<User> {
    const resData: User = await this.userService.createUser(user);
    resData.password = undefined;
    return resData;
  }

  @Post('/login')
  @Public()
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return await this.userService.login(loginDto.username, loginDto.password);
  }
}
