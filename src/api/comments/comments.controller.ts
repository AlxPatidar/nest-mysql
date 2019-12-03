import { Controller, UseGuards, Post, Body, Put, Delete, Param, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResponseData } from '../users/users/interfaces/response.interface';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './interfaces/createComment.dto';
import { UpdateCommentDto } from './interfaces/updateComment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentServices: CommentsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Body() post: CreateCommentDto,
    @Request() { user: { userId } }
  ): Promise<ResponseData> {
    return this.commentServices.create(post, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  update(
    @Body() post: UpdateCommentDto,
    @Request() { user: { userId } }
  ): Promise<ResponseData> {
    return this.commentServices.update(post, userId);
  }

  // Delete post using postId
  @UseGuards(AuthGuard('jwt'))
  @Delete(':postId')
  deleteById(@Param('postId') postId: number): Promise<ResponseData> {
    return this.commentServices.deleteById(postId);
  }
}
