import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateCardDto {
  @ApiProperty({
    description: 'Card title',
    example: 'Updated card title',
    required: true,
    nullable: false,
  })
  @IsString()
  @MinLength(1, { message: 'Title must be at least 1 characters long' })
  title: string;
}
