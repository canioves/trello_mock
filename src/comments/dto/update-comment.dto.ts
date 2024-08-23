import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Comment title',
    example: 'Updated Comment title',
    required: true,
    nullable: false,
  })
  @IsString()
  @MinLength(1, { message: 'Title must be at least 1 characters long' })
  title: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'Lorem Ipsum updated',
    required: true,
    nullable: false,
  })
  @IsString()
  @MinLength(1, { message: 'Text must be at least 1 characters long' })
  text: string;
}
