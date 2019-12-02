import { map } from 'lodash';
import { Injectable } from '@nestjs/common';
import { PostEntity } from './entity/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseData } from '../users/users/interfaces/response.interface';
import { CreatePostDto } from './interfaces/createPost.dto';
import { UpdatePostDto } from './interfaces/updatePost.dto';
import { UserEntity } from '../users/users/entity/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  parseResponse(post: PostEntity): PostEntity {
    return { ...post, user: post.user.beforeReturn() };
  }

  // Get all posts
  async findAll(): Promise<ResponseData> {
    const posts: PostEntity[] = await this.postRepository.find({
      relations: ['user'],
    });
    return {
      success: true,
      message: 'Post details fetch successfully.',
      data: map(posts, post => this.parseResponse(post)),
    };
  }

  // Find post by id
  async findById(postId: number): Promise<ResponseData> {
    const post: PostEntity = await this.postRepository.findOne(
      { id: postId },
      { relations: ['user'] }
    );
    if (post) {
      return {
        success: true,
        message: 'Post details fetch successfully.',
        data: this.parseResponse(post),
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
      userId,
    });
    const post: PostEntity = await this.postRepository.findOne(
      {
        id: identifiers[0].id,
      },
      { relations: ['user'] }
    );
    return {
      success: true,
      message: 'Post created successfully.',
      data: this.parseResponse(post),
    };
  }

  // update post with postId
  async update(payload: UpdatePostDto, userId: number): Promise<ResponseData> {
    const post: PostEntity = await this.postRepository.findOne({
      id: payload.postId,
    });
    if (post) {
      const updatedPost = await this.postRepository.update(
        { id: payload.postId },
        {
          title: payload.title ? payload.title : post.title,
          body: payload.body ? payload.body : post.body,
          userId,
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
