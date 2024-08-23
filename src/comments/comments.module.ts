import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { Card } from 'src/cards/cards.model';
import { CardsService } from 'src/cards/cards.service';
import { CardsModule } from 'src/cards/cards.module';
import { BoardsModule } from 'src/boards/boards.module';
import { Board } from 'src/boards/boards.model';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CardsService],
  imports: [
    SequelizeModule.forFeature([Comment, Board, Card]),
    CardsModule,
    BoardsModule,
  ],
  exports: [CommentsService],
})
export class CommentsModule {}
