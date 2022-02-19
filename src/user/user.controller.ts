import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { Public } from './jwt/public';
import { User } from './user.entity';
import { UserService } from './user.service';
export class Avatar {
  @ApiProperty({ type: String, name: 'img' })
  img: string;
}
@ApiBearerAuth()
@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @Public()
  async signUp(@Body() user: UserDto): Promise<User> {
    const resData: User = await this.userService.createUser(user);
    return resData;
  }

  @Post('/login')
  @Public()
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return await this.userService.login(loginDto.username, loginDto.password);
  }

  @Get('/getMe')
  async getMe(@GetUser() user: User): Promise<User> {
    return await this.userService.getMe(user.id);
  }

  @Post('/uploadAvatar')
  async uploadAvarta(
    @GetUser() user: User,
    @Body() data: Avatar,
  ): Promise<string> {
    return this.userService.uploadAvarta(data.img, user.id);
  }
}
