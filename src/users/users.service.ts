import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Comment } from 'src/comments/comments.model';
import { Board } from 'src/boards/boards.model';
import { Card } from 'src/cards/cards.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const candidate = await this.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException('User already exists', 500);
    }
    const hashPass = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.create({
      ...dto,
      password: hashPass,
    });
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll({
      include: [Board, Card, Comment],
    });
  }

  async getUserById(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id: userId },
      include: [Board, Card, Comment],
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
