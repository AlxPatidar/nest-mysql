import { map } from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entity/comments.entity';
import { Repository } from 'typeorm';
import { ResponseData } from '../users/users/interfaces/response.interface';
import { CreateCommentDto } from './interfaces/createComment.dto';
import { UpdateCommentDto } from './interfaces/updateComment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>
  ) { }
  parseCommentResponse(comment: CommentEntity) {
    return { ...comment, user: comment.user.parseUserData() };
  }

  // create comment on post id with user id
  async create(payload: CreateCommentDto, userId: number): Promise<ResponseData> {
    const { identifiers } = await this.commentRepository.insert({ ...payload, userId });
    const comment: CommentEntity = await this.commentRepository.findOne(
      {
        id: identifiers[0].id,
      },
      { relations: ['user', 'post', 'post.user'] }
    );
    return {
      success: true,
      message: 'Comment created successfully.',
      data: this.parseCommentResponse(comment),
    };
  }

  // update post with commentId
  async update(payload: UpdateCommentDto, userId: number): Promise<ResponseData> {
    const comment: CommentEntity = await this.commentRepository.findOne({ id: payload.commentId });
    if (comment) {
      const updatedPost = await this.commentRepository.update(
        { id: payload.commentId },
        {
          comment: payload.comment ? payload.comment : comment.comment,
          userId,
        }
      );
      return {
        success: true,
        message: 'Comment details updated successfully.',
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
  async deleteById(commentId: number): Promise<ResponseData> {
    const comment = await this.commentRepository.delete({ id: commentId });
    if (comment) {
      return {
        success: true,
        message: 'Comment deleted successfully.',
        data: comment,
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
