import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/entity/post.entity';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/entity/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PostEntity, UserEntity])],
  providers: [PostService, UserService],
  controllers: [PostController]
})
export class PostModule {}
