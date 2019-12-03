import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  TableForeignKey,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/api/users/users/entity/user.entity';
import { PostEntity } from 'src/api/posts/entity/posts.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  comment: string;

  @Column('integer')
  @JoinColumn()
  postId: number;

  @Column('integer')
  @JoinColumn()
  userId: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  // comment is belongs to user
  @ManyToOne(
    type => UserEntity,
    user => user.posts
  )
  user: UserEntity;

  // Post belongs to comment
  @ManyToOne(
    type => PostEntity,
    post => post.comments
  )
  post: PostEntity;

  // A function for return default data in realation ship
  parseCommentData() {
    const { id, comment, userId, postId, created } = this;
    const response: any = { id, comment, userId, postId, created };
    return response;
  }
}
