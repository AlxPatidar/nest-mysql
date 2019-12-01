import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column('text')
  body: string;

  @Column('integer')
  // tslint:disable-next-line:variable-name
  user_id: number;

  @CreateDateColumn()
  // tslint:disable-next-line:variable-name
  created_at: Date;

  @UpdateDateColumn()
  // tslint:disable-next-line:variable-name
  updated_at: Date;
}
