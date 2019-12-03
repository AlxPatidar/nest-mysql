import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as Bcrypt from 'bcryptjs';
import { PostEntity } from 'src/api/posts/entity/posts.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  // one user have many posts
  @OneToMany(
    type => PostEntity,
    post => post.user
  )
  posts: PostEntity[];
  
  // encode password for security before save
  @BeforeInsert()
  async encodePassword() {
    const salt = await Bcrypt.genSalt(10);
    this.password = await Bcrypt.hash(this.password, salt);
  }
  // A function for return default data in realation ship
  parseUserData() {
    const { id, name, email, created } = this;
    const response: any = { id, name, email, created };
    return response;
  }

  async checkPassword(password: string): Promise<boolean> {
    return await Bcrypt.compare(password, this.password);
  }
}
