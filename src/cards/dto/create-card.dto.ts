import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: 'Card title',
    example: 'New Card',
    required: true,
    nullable: false,
  })
  @IsString()
  @MinLength(1, { message: 'Title must be at least 1 characters long' })
  title: string;

  @ApiProperty({
    description: 'Board id',
    example: 1,
    required: true,
    nullable: false,
  })
  @IsNumber()
  boardId: number;

  authorId: number;
}
