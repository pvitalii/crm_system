import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  Res,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body(ValidationPipe) registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.register(registerDto);

    res.cookie('accessToken', token, {
      expires: new Date(Date.now() + Number(process.env.JWT_TOKEN_EXPIRATION) * 1000),
    });

    return { token };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(loginDto);

    res.cookie('accessToken', token, {
      expires: new Date(Date.now() + Number(process.env.JWT_TOKEN_EXPIRATION) * 1000),
    });

    return { token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }

  @Delete('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');

    return { message: 'Logged out successfully' };
  }
}
