import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { LoginRequestDto } from './interfaces/login.interface';
import { LoginResponse } from './interfaces/response.interface';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegistrationRequestDto } from './interfaces/registration.dto';
import { ResponseData } from '../users/interfaces/response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: LoginRequestDto): Promise<LoginResponse> {
    return this.authService.login(payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async authentication(@Request() req) {
    return req.user;
  }

  @Post('registration')
  async getProfile(
    @Body() payload: RegistrationRequestDto
  ): Promise<ResponseData> {
    return this.authService.registration(payload);
  }
}
