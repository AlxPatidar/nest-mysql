import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as Bcrypt from 'bcryptjs';

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

  @BeforeInsert()
  async encodePassword() {
    const salt = await Bcrypt.genSalt(10);
    this.password = await Bcrypt.hash(this.password, salt);
  }
  async checkPassword(password: string): Promise<boolean> {
    return await Bcrypt.compare(password, this.password);
  }
}
