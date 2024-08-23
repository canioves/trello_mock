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
import { CreateCardDto } from './dto/create-card.dto';
import { CardsService } from './cards.service';
import { AuthorGuard } from 'src/guards/author.guard';
import { UpdateCardDto } from './dto/update-card.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Cards')
@ApiBearerAuth('JWT-auth')
@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @ApiOperation({ summary: 'Create card' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Post('/')
  async createCard(@Body() dto: CreateCardDto, @Req() req, @Res() res) {
    await this.cardsService.createCard(dto, req.user.id);
    return res.send({
      status: HttpStatus.OK,
      message: 'Card has been created',
    });
  }

  @ApiOperation({ summary: 'Get all cards' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @Get('/')
  async getAllCards() {
    return await this.cardsService.getAllCards();
  }

  @ApiOperation({ summary: 'Get card by id' })
  @ApiParam({ name: 'id', required: true, description: 'Card id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(AuthorGuard)
  @Get('/:id')
  async getCardById(@Param('id') id: number) {
    return await this.cardsService.getCardById(id);
  }

  @ApiOperation({ summary: 'Update card' })
  @ApiParam({ name: 'id', required: true, description: 'Card id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @UseGuards(AuthorGuard)
  @Post('/:id')
  async updateCard(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCardDto,
    @Res() res,
  ) {
    await this.cardsService.updateCard(id, dto);
    return res.send({
      status: HttpStatus.OK,
      message: `Card with id ${id} has been updated`,
    });
  }

  @ApiOperation({ summary: 'Delete card' })
  @ApiParam({ name: 'id', required: true, description: 'Card id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(AuthorGuard)
  @Delete('/:id')
  async deleteCard(@Param('id', ParseIntPipe) id: number, @Res() res) {
    await this.cardsService.deleteCard(id);
    return res.send({
      status: HttpStatus.OK,
      message: `Card with id ${id} has been deleted`,
    });
  }
}
