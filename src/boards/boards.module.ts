import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Board } from './boards.model';
import { User } from 'src/users/users.model';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [SequelizeModule.forFeature([Board, User])],
})
export class BoardsModule {}
