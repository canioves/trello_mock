import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Board } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { Card } from 'src/cards/cards.model';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(@InjectModel(Board) private boardRepository: typeof Board) {}

  async createBoard(dto: CreateBoardDto, authorId: number) {
    const board = await this.boardRepository.create({
      ...dto,
      authorId: authorId,
    });
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

  async getAllBoardsByAuthor(authorId: number) {
    return await this.boardRepository.findAll({
      where: { authorId: authorId },
    });
  }

  async updateBoard(id: number, dto: UpdateBoardDto) {
    return await this.boardRepository.update(
      { title: dto.title },
      { where: { id } },
    );
  }

  async deleteBoard(id: number) {
    return await this.boardRepository.destroy({ where: { id } });
  }
}
