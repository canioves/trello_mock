import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Board } from './boards.model';
import { CardsService } from 'src/cards/cards.service';
import { Card } from 'src/cards/cards.model';
import { Comment } from 'src/comments/comments.model';
import { CommentsService } from 'src/comments/comments.service';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, CardsService, CommentsService],
  imports: [SequelizeModule.forFeature([Board, Card, Comment])],
  exports: [BoardsService],
})
export class BoardsModule {}
