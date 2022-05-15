import { UserEntity } from './../entities/user.entity';
import { UpdateUserDto } from './../dto/update-user.dto';
import { CreateUserDto } from './../dto/create-user.dto';
import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.prisma.user.create({
            data: createUserDto,
            include: {
                posts: {
                    select: {
                        title: true,
                        createAt: true,
                    },
                },
            },
        });
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.prisma.user.findMany({
            include: {
                posts: {
                    select: {
                        title: true,
                        createAt: true,
                    },
                },
            },
        });
    }

    async findOne(id: number): Promise<UserEntity> {
        return await this.prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                posts: {
                    select: {
                        title: true,
                        createAt: true,
                    },
                },
            },
        });
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async update(
        id: number,
        updateUserDto: UpdateUserDto,
    ): Promise<UserEntity> {
        return this.prisma.user.update({
            where: {
                id,
            },
            data: updateUserDto,
            include: {
                posts: {
                    select: {
                        title: true,
                        createAt: true,
                    },
                },
            },
        });
    }

    async remove(id: number): Promise<UserEntity> {
        return this.prisma.user.delete({
            where: {
                id,
            },
        });
    }
}
