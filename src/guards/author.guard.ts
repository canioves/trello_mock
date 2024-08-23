import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { BoardsService } from 'src/boards/boards.service';
import { CardsService } from 'src/cards/cards.service';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private boardsService: BoardsService,
    private cardsService: CardsService,
    private commentsService: CommentsService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const controllerName = context.getClass().name;
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;
    const user = request.user;

    let model;

    switch (controllerName) {
      case 'BoardsController':
        model = await this.boardsService.getBoardById(id);
        if (!model) {
          throw new BadRequestException('Board not found');
        }
        break;
      case 'CardsController':
        model = await this.cardsService.getCardById(id);
        if (!model) {
          throw new BadRequestException('Card not found');
        }
        break;
      case 'CommentsController':
        model = await this.commentsService.getCommentById(id);
        if (!model) {
          throw new BadRequestException('Comment not found');
        }
        break;
    }
    if (user && model && user.id === model.authorId) {
      return true;
    }
    return false;
  }
}
