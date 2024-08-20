import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Card } from 'src/cards/cards.model';
import { User } from 'src/users/users.model';

@Table({ tableName: 'Boards', timestamps: false })
export class Board extends Model<Board> {
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

  @HasMany(() => Card)
  cards: Card[];
}
