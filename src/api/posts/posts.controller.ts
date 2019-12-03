import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  UseGuards,
  Put,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ResponseData } from '../users/users/interfaces/response.interface';
import { CreatePostDto } from './interfaces/createPost.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePostDto } from './interfaces/updatePost.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Find all post and its comment
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<ResponseData> {
    return this.postsService.findAll();
  }
  // Get post details using postId
  @UseGuards(AuthGuard('jwt'))
  @Get(':postId')
  findById(@Param('postId') postId: number): Promise<ResponseData> {
    return this.postsService.findById(postId);
  }

  // Create post data for create new post
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Body() post: CreatePostDto,
    @Request() { user: { userId } }
  ): Promise<ResponseData> {
    return this.postsService.create(post, userId);
  }

  // update post detail
  @UseGuards(AuthGuard('jwt'))
  @Put()
  update(
    @Body() post: UpdatePostDto,
    @Request() { user: { userId } }
  ): Promise<ResponseData> {
    return this.postsService.update(post, userId);
  }

  // Delete post using postId
  @UseGuards(AuthGuard('jwt'))
  @Delete(':postId')
  deleteById(@Param('postId') postId: number): Promise<ResponseData> {
    return this.postsService.deleteById(postId);
  }
}
