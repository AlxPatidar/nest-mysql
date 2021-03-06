import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from 'src/api/users/users/entity/user.entity';
import { CommentEntity } from 'src/api/comments/entity/comments.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column('text')
  body: string;

  @Column('integer')
  @JoinColumn()
  userId: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  // Post belong to user
  // or many post belong to one user
  @ManyToOne(
    type => UserEntity,
    user => user.posts
  )
  user: UserEntity;

  // One post have many commnets
  @OneToMany(
    type => CommentEntity,
    comment => comment.post
  )
  comments: CommentEntity[];

  // A function for return default data in realation ship
  parsePostData() {
    const { id, title, body, userId, created } = this;
    const response: any = { id, title, body, userId, created };
    return response;
  }
}
