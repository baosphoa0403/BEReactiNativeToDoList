import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './user/jwt/jwt-auth.guard';

@Module({
  imports: [
    TaskModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bjstlnhqypjyzutx8ypf-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'uv0eoadwhb4s4mbm',
      password: '6V1em5nAMg9VBSN7HU9t',
      database: 'bjstlnhqypjyzutx8ypf',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
