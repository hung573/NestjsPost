import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostDTO } from 'src/dto/posts/post.dto';
import { PostEntity } from 'src/entity/post.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity) private postRebo: Repository<PostEntity>,
    ){}

    // CRUD
    async createPost(@Body() postDTO: PostDTO, currentUser: UserEntity): Promise<PostDTO>{
        
        const post = await this.postRebo.create(postDTO);
        post.user = currentUser;
        return await this.postRebo.save(post);
    }
    
}
