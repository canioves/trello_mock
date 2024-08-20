import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Card } from 'src/cards/cards.model';
import { User } from 'src/users/users.model';

@Table({ tableName: 'Comments', timestamps: false })
export class Comment extends Model<Comment> {
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataTypes.STRING, allowNull: false })
  title: string;

  @Column({ type: DataTypes.STRING, allowNull: false })
  text: string;

  @BelongsTo(() => User)
  user: User;
  @ForeignKey(() => User)
  @Column
  authorId: number;

  @BelongsTo(() => Card)
  card: Card;
  @ForeignKey(() => Card)
  @Column
  cardId: number;
}
