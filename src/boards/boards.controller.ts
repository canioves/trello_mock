import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createBoard(@Body() dto: CreateBoardDto, @Req() req, @Res() res) {
    console.log(req.user.id);
    const id = req.user.id;
    const board = await this.boardsService.createBoard({
      ...dto,
      authorId: id,
    });
    return res.send({ status: 'ok', message: board });
  }
}
