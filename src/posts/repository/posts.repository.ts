import { NotFoundError } from './../../comon/errors/types/NotFoundError';
import { UsersRepository } from './../../users/repository/users.repository';
import { PostEntity } from '../../posts/entities/post.entity';
import { UpdatePostDto } from '../../posts/dto/update-post.dto';
import { CreatePostDto } from '../../posts/dto/create-post.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsRepository {
    constructor(
        private readonly prisma: PrismaService,
        private readonly userRepository: UsersRepository,
    ) {}

    async create(createPostDto: CreatePostDto): Promise<PostEntity> {
        const { authorEmail } = createPostDto;
        delete createPostDto.authorEmail;
        const user = await this.userRepository.findByEmail(authorEmail);

        if (!user) throw new NotFoundError('Author not found');

        const data: Prisma.PostCreateInput = {
            ...createPostDto,
            author: {
                connect: {
                    email: authorEmail,
                },
            },
        };

        return this.prisma.post.create({
            data,
        });
    }

    async findAll(): Promise<PostEntity[]> {
        return this.prisma.post.findMany({
            include: {
                author: true,
            },
        });
    }

    async findOne(id: number): Promise<PostEntity> {
        return await this.prisma.post.findUnique({
            where: {
                id,
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }

    async update(
        id: number,
        updatePostDto: UpdatePostDto,
    ): Promise<PostEntity> {
        const { authorEmail } = updatePostDto;
        if (!authorEmail) {
            return this.prisma.post.update({
                data: updatePostDto,
                where: { id },
                include: {
                    author: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
        }

        delete updatePostDto.authorEmail;
        const user = await this.userRepository.findByEmail(authorEmail);
        if (!user) throw new NotFoundError('Author not found');

        const data: Prisma.PostUpdateInput = {
            ...updatePostDto,
            author: {
                connect: {
                    email: authorEmail,
                },
            },
        };
        return this.prisma.post.update({
            where: { id },
            data,
            include: {
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }

    async remove(id: number): Promise<PostEntity> {
        return this.prisma.post.delete({
            where: {
                id,
            },
        });
    }
}
