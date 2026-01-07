// src/common/decorators/current-user.decorator.ts
//Este decorador toma el usuario del request (que debe estar disponible luego del guard JWT):

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
