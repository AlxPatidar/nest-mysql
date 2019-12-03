import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentEntity } from './entity/comments.entity';
import { UserEntity } from '../users/users/entity/user.entity';
import { PostEntity } from '../posts/entity/posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity, PostEntity])],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
