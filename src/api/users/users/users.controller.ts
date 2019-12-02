import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './interfaces/createUser.dto';
import { ResponseData } from './interfaces/response.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getUsers(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':userId')
  getUser(@Param('userId') userId: number): Promise<ResponseData> {
    return this.usersService.findById(userId);
  }
  @Post()
  create(@Body() user: CreateUserDto): Promise<ResponseData> {
    return this.usersService.create(user);
  }
}
