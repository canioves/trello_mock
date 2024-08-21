import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { AuthorGuard } from 'src/guards/author.guard';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post('/')
  async createBoard(@Body() dto: CreateBoardDto, @Req() req, @Res() res) {
    const id = req.user.id;
    await this.boardsService.createBoard({
      ...dto,
      authorId: id,
    });
    return res.send({ status: 'ok', message: 'Board has been created' });
  }

  @Get('/')
  async getAllBoards() {
    return this.boardsService.getAllBoards();
  }

  @UseGuards(AuthorGuard)
  @Get('/:boardId')
  async getBoardById(@Param('boardId', ParseIntPipe) boardId: number) {
    return this.boardsService.getBoardById(boardId);
  }
}
