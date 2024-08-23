import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
import { UpdateBoardDto } from './dto/update-board.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Boards')
@ApiBearerAuth('JWT-auth')
@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @ApiOperation({ summary: 'Create board' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Post('/')
  async createBoard(@Body() dto: CreateBoardDto, @Req() req, @Res() res) {
    const authorId = req.user.id;
    await this.boardsService.createBoard(dto, authorId);
    return res.send({
      status: HttpStatus.OK,
      message: 'Board has been created',
    });
  }

  @ApiOperation({ summary: 'Get all boards' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @Get('/')
  async getAllBoards() {
    return this.boardsService.getAllBoards();
  }

  @ApiOperation({ summary: 'Get board by id' })
  @ApiParam({ name: 'id', required: true, description: 'Board id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(AuthorGuard)
  @Get('/:id')
  async getBoardById(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.getBoardById(id);
  }

  @ApiOperation({ summary: 'Update board' })
  @ApiParam({ name: 'id', required: true, description: 'Board id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @UseGuards(AuthorGuard)
  @Post('/:id')
  async updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBoardDto,
    @Res() res,
  ) {
    await this.boardsService.updateBoard(id, dto);
    return res.send({
      status: HttpStatus.OK,
      message: `Board with id ${id} has been updated`,
    });
  }

  @ApiOperation({ summary: 'Delete board' })
  @ApiParam({ name: 'id', required: true, description: 'Board id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(AuthorGuard)
  @Delete('/:id')
  async deleteBoard(@Param('id', ParseIntPipe) id: number, @Res() res) {
    await this.boardsService.deleteBoard(id);
    return res.send({
      status: HttpStatus.OK,
      message: `Board with id ${id} has been deleted`,
    });
  }
}
