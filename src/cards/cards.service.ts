import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './cards.model';
import { Comment } from 'src/comments/comments.model';
import { CreateCardDto } from './dto/create-card.dto';
import { BoardsService } from 'src/boards/boards.service';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card) private cardRepository: typeof Card,
    private boardsService: BoardsService,
  ) {}

  async createCard(dto: CreateCardDto, authorId: number) {
    const boards = await this.boardsService.getAllBoardsByAuthor(authorId);
    if (!boards.some((board) => board.id === dto.boardId)) {
      throw new UnauthorizedException("You can't add card to this board");
    }
    return await this.cardRepository.create({
      ...dto,
      authorId: authorId,
    });
  }

  async getAllCards() {
    return await this.cardRepository.findAll({ include: [Comment] });
  }

  async getCardById(id: number) {
    return await this.cardRepository.findOne({
      where: { id },
      include: [Comment],
    });
  }

  async getAllCardsByAuthor(authorId: number) {
    return await this.cardRepository.findAll({ where: { authorId } });
  }

  async updateCard(id: number, dto: UpdateCardDto) {
    return await this.cardRepository.update(
      { title: dto.title },
      { where: { id } },
    );
  }

  async deleteCard(id: number) {
    return await this.cardRepository.destroy({ where: { id } });
  }
}
