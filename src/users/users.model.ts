import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

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
}
