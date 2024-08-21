import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Board } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { Card } from 'src/cards/cards.model';

@Injectable()
export class BoardsService {
  constructor(@InjectModel(Board) private boardRepository: typeof Board) {}

  async createBoard(dto: CreateBoardDto) {
    const board = await this.boardRepository.create(dto);
    return board;
  }

  async getAllBoards() {
    return await this.boardRepository.findAll({ include: [Card] });
  }

  async getBoardById(id: number) {
    return await this.boardRepository.findOne({
      where: { id },
      include: [Card],
    });
  }
}
