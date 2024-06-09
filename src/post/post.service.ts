import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { PostDTO } from 'src/dto/posts/post.dto';
import { PostEntity } from 'src/entity/post.entity';
import { UserEntity } from 'src/entity/user.entity';
import { checkPermission } from 'src/helpers/checkPermissiom.helper';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity) private postRebo: Repository<PostEntity>,
        @InjectRepository(UserEntity) private userRebo: Repository<UserEntity>,
    ){}

    // CRUD
    async createPost(@Body() postDTO: PostDTO, currentUser: UserEntity): Promise<PostDTO>{
        
        const post = await this.postRebo.create(postDTO);
        post.user = currentUser;
        return await this.postRebo.save(post);
    }

    async findAll(): Promise<PostDTO[]>{
        return await this.postRebo.find();
    }

    async findById(id: number): Promise<PostDTO>{
        const check = await this.postRebo.findOne({
            where: { id },
            relations: ['user']
        });
        if(!check){
            throw new NotFoundException(`id:${id} bai post hien khong co ton tai !!!`)
        }
        // const check = await this.postRebo.findOneBy({id})
        return check;

    }
    async updatePost(@Body() postDTO: PostDTO, id: number, currentUser: UserEntity): Promise<PostDTO>{
        const checkPost = this.findById(id);
        checkPermission.checkPostUpdate((await checkPost).user.id, currentUser);
        await this.postRebo.update(id, postDTO);
        return plainToInstance(PostDTO, checkPost,{
            excludeExtraneousValues: true
        });
    }

    async deletePost(id: number, currentUser: UserEntity): Promise<boolean>{
        const checkPost = this.findById(id);
        if(checkPost){
            checkPermission.checkPostDelete((await checkPost).user.id, currentUser);
            await this.postRebo.delete(id)
        }
        return true;
    }

    async getAllPostOrAccount(currentUser: UserEntity): Promise<PostDTO[]>{
        const id = Number(currentUser.id);
        console.log(currentUser.id);
        const user = await this.userRebo.findOne({
            where: {id}, 
            relations: ['posts'] 
        });
        return user.posts;
    }
    
    
}
