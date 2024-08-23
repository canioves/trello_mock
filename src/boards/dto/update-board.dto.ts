import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateBoardDto {
  @ApiProperty({
    description: 'Board title',
    example: 'Updated board title',
    required: true,
    nullable: false,
  })
  @IsString()
  @MinLength(1, { message: 'Title must be at least 1 characters long' })
  title: string;
}
