import { UsersRepository } from './../users/repository/users.repository';
import { PostsRepository } from './repository/posts.repository';
import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
    controllers: [PostsController],
    providers: [PostsService, PrismaService, PostsRepository, UsersRepository],
})
export class PostsModule {}
