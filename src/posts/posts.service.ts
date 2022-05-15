import { NotFoundError } from './../comon/errors/types/NotFoundError';
import { UnauthorizedError } from './../comon/errors/types/UnauthorizedError';
import { PostEntity } from './entities/post.entity';
import { PostsRepository } from './repository/posts.repository';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
    constructor(private readonly repository: PostsRepository) {}

    create(createPostDto: CreatePostDto) {
        return this.repository.create(createPostDto);
    }

    findAll() {
        // throw new UnauthorizedError('Não Autorizado');
        return this.repository.findAll();
    }

    async findOne(id: number): Promise<PostEntity> {
        const post = await this.repository.findOne(id);
        if (!post) throw new NotFoundError('Usuário não encontrado');

        return post;
    }

    update(id: number, updatePostDto: UpdatePostDto) {
        return this.repository.update(id, updatePostDto);
    }

    remove(id: number) {
        return this.repository.remove(id);
    }
}
