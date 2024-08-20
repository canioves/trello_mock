import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
@Module({
  imports: [
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0000',
      database: 'trello_mock',
      models: [User],
      autoLoadModels: true,
      sync: { force: true },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
