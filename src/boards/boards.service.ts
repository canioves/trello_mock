import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Board } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(@InjectModel(Board) private boardRepository: typeof Board) {}

  async createBoard(dto: CreateBoardDto) {
    const board = await this.boardRepository.create(dto);
    return board;
  }
}
