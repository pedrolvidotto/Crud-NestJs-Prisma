import { NotFoundError } from './../comon/errors/types/NotFoundError';
import { UserEntity } from './entities/user.entity';
import { UnauthorizedError } from './../comon/errors/types/UnauthorizedError';
import { UsersRepository } from './repository/users.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly repository: UsersRepository) {}

    create(createUserDto: CreateUserDto) {
        return this.repository.create(createUserDto);
    }

    findAll() {
        // throw new UnauthorizedError('Não Autorizado');
        return this.repository.findAll();
    }

    async findOne(id: number): Promise<UserEntity> {
        const user = await this.repository.findOne(id);
        if (!user) throw new NotFoundError('Usuário não encontrado');

        return user;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return this.repository.update(id, updateUserDto);
    }

    remove(id: number) {
        return this.repository.remove(id);
    }
}
