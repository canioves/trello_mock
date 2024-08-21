import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/')
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Get('/')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':userId')
  getUserById(@Param('userId', ParseIntPipe) userId: number) {
    return this.getUserById(userId);
  }
}
