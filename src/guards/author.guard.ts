import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { BoardsService } from 'src/boards/boards.service';

export class AuthorGuard implements CanActivate {
  constructor(private boardsService: BoardsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const controllerName = context.getClass().name;
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;
    const user = request.user;

    let model;

    switch (controllerName) {
      case 'BoardsController':
        model = this.boardsService.getBoardById(id);
        if (!model) {
          throw new BadRequestException('Board not found');
        }
        break;
    }
    if (user && model && user.id === model.authorId) {
      return true;
    }
    return false;
  }
}
