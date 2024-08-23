import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@mail.com',
    required: true,
    nullable: false,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '12345678',
    required: true,
    nullable: false,
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
