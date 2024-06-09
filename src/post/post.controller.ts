import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
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
    @Get('all-post')
    @UseGuards(AuthGuard)
    GetAllPostOrAccount(@CurrentUser() currentUser: UserEntity): Promise<PostDTO[]>{
        return this.postService.getAllPostOrAccount(currentUser);
    }
    @Get()
    FindAll(): Promise<PostDTO[]>{
        return this.postService.findAll();
    }

    @Get(':id')
    FindById(@Param('id', ParseIntPipe) id: number): Promise<PostDTO>{
        return this.postService.findById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    UpdatePost(@Body() postDTO: PostDTO,@Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: UserEntity): Promise<PostDTO>{
        return this.postService.updatePost(postDTO, id, currentUser);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    DeletePost(@Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: UserEntity): Promise<boolean>{
        return this.postService.deletePost(id, currentUser)
    }


}
