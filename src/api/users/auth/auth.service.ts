import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './interfaces/login.interface';
import { LoginResponse } from './interfaces/response.interface';
import { ResponseData } from '../users/interfaces/response.interface';
import { RegistrationRequestDto } from './interfaces/registration.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  // Check email and password and return user details with token
  async login(credential: LoginRequestDto): Promise<LoginResponse> {
    const user = await this.usersService.findOne(credential.email);
    if (user) {
      if (user.checkPassword(credential.password)) {
        const payload = {
          email: user.email,
          userId: user.id,
          name: user.name,
        };
        // Create token based on role details
        const token = this.jwtService.sign(payload);
        user.password = null;
        return {
          success: true,
          message: 'Logged-in successfully.',
          token,
          data: user,
        };
      } else {
        return {
          success: false,
          token: '',
          message: 'Wrong Password. Please try again.',
          data: {},
        };
      }
    } else {
      return {
        success: false,
        message: 'Login email not found. Please register.',
        token: '',
        data: {},
      };
    }
  }
  async registration(
    credential: RegistrationRequestDto
  ): Promise<ResponseData> {
    return this.usersService.create(credential);
  }
}
