import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './interfaces/createUser.dto';
import { ResponseData } from './interfaces/response.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  // Get all user
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
  // Find user by id
  async findById(userId: number): Promise<ResponseData> {
    const user: UserEntity = await this.userRepository.findOne(
      { id: userId },
      { relations: ['posts'] }
    );
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
  async findOne(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne(
      { email },
      { relations: ['posts'] }
    );
  }

  // Create user before save encrypt password
  async create(payload: CreateUserDto): Promise<ResponseData> {
    const newUser: UserEntity = await this.userRepository.findOne({
      email: payload.email,
    });
    if (!newUser) {
      const { identifiers } = await this.userRepository.insert(payload);
      const createUser: UserEntity | any = await this.userRepository.findOne(
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
