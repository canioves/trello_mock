import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CardsService } from 'src/cards/cards.service';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    private cardsService: CardsService,
  ) {}

  async createComment(dto: CreateCommentDto, authorId: number) {
    const cards = await this.cardsService.getAllCardsByAuthor(authorId);
    if (!cards.some((card) => card.id === dto.cardId)) {
      throw new UnauthorizedException("You can't add comment to this card");
    }
    return await this.commentRepository.create({
      ...dto,
      authorId: authorId,
    });
  }

  async getAllComments() {
    return await this.commentRepository.findAll();
  }

  async getCommentById(id: number) {
    return await this.commentRepository.findOne({ where: { id } });
  }

  async updateComment(id: number, dto: UpdateCommentDto) {
    return await this.commentRepository.update(
      { title: dto.title, text: dto.text },
      { where: { id } },
    );
  }

  async deleteComment(id: number) {
    return await this.commentRepository.destroy({ where: { id } });
  }
}
