import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Board } from 'src/boards/boards.model';
import { Comment } from 'src/comments/comments.model';
import { User } from 'src/users/users.model';

@Table({ tableName: 'Cards', timestamps: false })
export class Card extends Model<Card> {
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataTypes.STRING, allowNull: false })
  title: string;

  @BelongsTo(() => User)
  user: User;
  @ForeignKey(() => User)
  @Column
  authorId: number;

  @BelongsTo(() => Board)
  board: Board;
  @ForeignKey(() => Board)
  @Column
  boardId: number;

  @HasMany(() => Comment)
  comments: Comment[];
}
