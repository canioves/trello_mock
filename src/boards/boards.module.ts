import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Board } from './boards.model';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [
    SequelizeModule.forFeature([Board, User]),
    AuthModule,
    JwtModule,
    ConfigModule,
  ],
})
export class BoardsModule {}
