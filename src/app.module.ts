import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { User } from './users/users.model';
import { Board } from './boards/boards.model';
import { Card } from './cards/cards.model';
import { Comment } from './comments/comments.model';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0000',
      database: 'trello_mock',
      models: [User, Board, Card, Comment],
      retryAttempts: 1,
      synchronize: true,
      autoLoadModels: true,
    }),
    UsersModule,
    BoardsModule,
    CardsModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
