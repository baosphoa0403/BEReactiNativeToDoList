import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}
  async createUser(user: UserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    user.avatar = 'https://i.ibb.co/ySpnGMf/abc.jpg';
    const userEntity = await this.userRepo.create(user);
    return await this.userRepo.save(userEntity);
  }
  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string; message: string }> {
    const user = await this.userRepo.findOne({ username });
    if (!user)
      throw new HttpException('username invalid', HttpStatus.BAD_REQUEST);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new HttpException('password invalid', HttpStatus.BAD_REQUEST);
    return {
      access_token: this.jwtService.sign({ ...user }),
      message: 'login successfuly',
    };
  }
  async uploadAvarta(url: string, userid: number): Promise<string> {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ avatar: url })
      .where('id = :id', { id: userid })
      .execute();
    return 'Upload avatar successfully';
  }
  async getMe(id: number): Promise<User> {
    return await getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne();
  }
}
