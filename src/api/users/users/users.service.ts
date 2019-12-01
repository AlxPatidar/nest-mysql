import * as Bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './interfaces/createUser.dto';
import { ResponseData } from './interfaces/response.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  // Get all user
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  // Find user by id
  async findById(userId: number): Promise<ResponseData> {
    const user: User = await this.userRepository.findOne({ id: userId });
    if (user) {
      return {
        success: true,
        message: 'User details fetch successfully.',
        data: user,
      };
    } else {
      return {
        success: false,
        message: 'No user found. Invalid user id.',
        data: {},
      };
    }
  }

  // Find user details with email id
  async findOne(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ email });
  }

  // Create user before save encrypt password
  async create(payload: CreateUserDto): Promise<ResponseData> {
    const newUser: User = await this.userRepository.findOne({
      email: payload.email,
    });
    if (!newUser) {
      const salt = await Bcrypt.genSalt(10);
      const password = await Bcrypt.hash(payload.password, salt);
      const { identifiers } = await this.userRepository.insert({
        ...payload,
        password,
      });
      const createUser: User | any = await this.userRepository.findOne(
        identifiers[0].id
      );
      return {
        success: true,
        message: 'User created successfully.',
        data: createUser,
      };
    } else {
      return {
        success: false,
        message: 'User already exists with this email address!!!',
        data: {},
      };
    }
  }
}
