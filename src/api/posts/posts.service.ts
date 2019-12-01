import { Injectable } from '@nestjs/common';
import { Posts } from './entity/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseData } from '../users/users/interfaces/response.interface';
import { CreatePostDto } from './interfaces/createPost.dto';
import { UpdatePostDto } from './interfaces/updatePost.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly postRepository: Repository<Posts>
  ) {}
  // Get all posts
  async findAll(): Promise<ResponseData> {
    const posts: Posts[] = await this.postRepository.find();
    return {
      success: true,
      message: 'Post details fetch successfully.',
      data: posts,
    };
  }

  // Find post by id
  async findById(postId: number): Promise<ResponseData> {
    const posts: Posts = await this.postRepository.findOne({ id: postId });
    if (posts) {
      return {
        success: true,
        message: 'Post details fetch successfully.',
        data: posts,
      };
    } else {
      return {
        success: true,
        message: 'No post found.',
        data: {},
      };
    }
  }

  // create post with user id
  async create(payload: CreatePostDto, userId: number): Promise<ResponseData> {
    const { identifiers } = await this.postRepository.insert({
      ...payload,
      user_id: userId,
    });
    const post: Posts = await this.postRepository.findOne(identifiers[0].id);
    return {
      success: true,
      message: 'Post created successfully.',
      data: post,
    };
  }

  // update post with postId
  async update(payload: UpdatePostDto, userId: number): Promise<ResponseData> {
    const post: Posts = await this.postRepository.findOne({
      id: payload.postId,
    });
    if (post) {
      const updatedPost = await this.postRepository.update(
        { id: payload.postId },
        {
          title: payload.title ? payload.title : post.title,
          body: payload.body ? payload.body : post.body,
          user_id: userId,
        }
      );
      return {
        success: true,
        message: 'Post details updated successfully.',
        data: updatedPost,
      };
    } else {
      return {
        success: true,
        message: 'No post found.',
        data: {},
      };
    }
  }

  // Delete post
  async deleteById(postId: number): Promise<ResponseData> {
    const posts = await this.postRepository.delete({ id: postId });
    if (posts) {
      return {
        success: true,
        message: 'Post deleted successfully.',
        data: posts,
      };
    } else {
      return {
        success: false,
        message: 'No post found.',
        data: {},
      };
    }
  }
}
