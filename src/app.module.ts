import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bjstlnhqypjyzutx8ypf-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'uv0eoadwhb4s4mbm',
      password: '6V1em5nAMg9VBSN7HU9t',
      database: 'bjstlnhqypjyzutx8ypf',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
