import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UserModule, PostsModule, CommentsModule],
})
export class ApiModule { }
