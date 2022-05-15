import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty({ description: 'Titulo do Post' })
    @IsString()
    @IsNotEmpty()
    title: string;
    @ApiProperty({ description: 'Conteúdo do Posto' })
    @IsString()
    @IsOptional()
    content?: string;
    @ApiProperty({ description: 'Email do proprietário do Post' })
    @IsEmail()
    authorEmail: string;
}
