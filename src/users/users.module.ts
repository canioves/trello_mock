import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Board } from 'src/boards/boards.model';
import { Card } from 'src/cards/cards.model';
import { Comment } from 'src/comments/comments.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Board, Card, Comment])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
