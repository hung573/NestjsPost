import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDTO } from 'src/dto/posts/post.dto';
import { CurrentUser } from 'src/user/decorator/currentUser.decorator';
import { UserEntity } from 'src/entity/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('/api/post')
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
    constructor(
        private readonly postService: PostService,
    ){}
    
    @Post()
    @UseGuards(AuthGuard)
    CreatePost(@Body() postDTO: PostDTO, @CurrentUser() currentUser: UserEntity): Promise<PostDTO>{
        return this.postService.createPost(postDTO, currentUser);
    }

}
