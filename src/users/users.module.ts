import { UsersRepository } from './repository/users.repository';
import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
    controllers: [UsersController],
    providers: [UsersService, PrismaService, UsersRepository],
})
export class UsersModule {}
