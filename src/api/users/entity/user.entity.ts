import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  // tslint:disable-next-line:variable-name
  created_at: Date;

  @UpdateDateColumn()
  // tslint:disable-next-line:variable-name
  updated_at: Date;
}
