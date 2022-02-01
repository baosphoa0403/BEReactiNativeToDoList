import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/user/user.entity';

type BodyUser = Request & { user: User };
export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const reqBody: BodyUser = ctx.switchToHttp().getRequest<BodyUser>();
    return reqBody.user;
  },
);
