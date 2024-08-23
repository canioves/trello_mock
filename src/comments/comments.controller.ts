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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthorGuard } from 'src/guards/author.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comments')
@ApiBearerAuth('JWT-auth')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Post('/')
  async createComment(@Body() dto: CreateCommentDto, @Req() req, @Res() res) {
    await this.commentsService.createComment(dto, req.user.id);
    return res.send({
      status: HttpStatus.OK,
      message: 'Comment has been created',
    });
  }

  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @Get('/')
  async getAllComments() {
    return await this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: 'Get comment by id' })
  @ApiParam({ name: 'id', required: true, description: 'Comment id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(AuthorGuard)
  @Get('/:id')
  async getCommentById(@Param('id') id: number) {
    return await this.commentsService.getCommentById(id);
  }

  @ApiOperation({ summary: 'Update comment' })
  @ApiParam({ name: 'id', required: true, description: 'Comment id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @UseGuards(AuthorGuard)
  @Post('/:id')
  async updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCommentDto,
    @Res() res,
  ) {
    await this.commentsService.updateComment(id, dto);
    return res.send({
      status: HttpStatus.OK,
      message: `Comment with id ${id} has been updated`,
    });
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiParam({ name: 'id', required: true, description: 'Comment id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(AuthorGuard)
  @Delete('/:id')
  async deleteComment(@Param('id', ParseIntPipe) id: number, @Res() res) {
    await this.commentsService.deleteComment(id);
    return res.send({
      status: HttpStatus.OK,
      message: `Comment with id ${id} has been deleted`,
    });
  }
}
