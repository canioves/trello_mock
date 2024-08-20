import { DataTypes } from 'sequelize';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Board } from 'src/boards/boards.model';
import { Card } from 'src/cards/cards.model';
import { Comment } from 'src/comments/comments.model';

interface UserCreateAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'Users', timestamps: false })
export class User extends Model<User, UserCreateAttrs> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  })
  email: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Board)
  boards: Board[];

  @HasMany(() => Card)
  cards: Card[];

  @HasMany(() => Comment)
  comments: Comment[];
}
