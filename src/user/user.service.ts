import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}
  async createUser(user: UserDto): Promise<User> {
    const userEntity = await this.userRepo.create(user);
    return await this.userRepo.save(userEntity);
  }
  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepo.findOne({ username, password });
    if (!user)
      throw new HttpException(
        'user name or password invalid',
        HttpStatus.BAD_REQUEST,
      );
    user.password = undefined;
    return { access_token: this.jwtService.sign({ ...user }) };
  }
}
