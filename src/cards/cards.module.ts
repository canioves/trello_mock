import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from './cards.model';
import { Board } from 'src/boards/boards.model';
import { BoardsService } from 'src/boards/boards.service';
import { BoardsModule } from 'src/boards/boards.module';
import { Comment } from 'src/comments/comments.model';
import { CommentsService } from 'src/comments/comments.service';

@Module({
  controllers: [CardsController],
  providers: [CardsService, BoardsService, CommentsService],
  imports: [SequelizeModule.forFeature([Card, Board, Comment]), BoardsModule],
  exports: [CardsService],
})
export class CardsModule {}
