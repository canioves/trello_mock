import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment title',
    example: 'New Comment',
    required: true,
    nullable: false,
  })
  @IsString()
  @MinLength(1, { message: 'Title must be at least 1 characters long' })
  title: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'Lorem Ipsum',
    required: true,
    nullable: false,
  })
  @IsString()
  @MinLength(1, { message: 'Text must be at least 1 characters long' })
  text: string;

  @ApiProperty({
    description: 'Card id',
    example: 1,
    required: true,
    nullable: false,
  })
  @IsNumber()
  cardId: number;

  authorId: number;
}
