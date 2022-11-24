import { User } from './entities/user.entity';
import { DatabaseModule } from './../database/database.module';
import { userProviders } from './user.providers';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [UserService]
})
export class UserModule { }
