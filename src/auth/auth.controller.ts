import { Controller, Get, Headers, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Public()
  @Post('signup')
  async signup(@Request() req) {
    return this.authService.signUp(req.body);
  }

  @Get()
  async validateUserEmail(@Headers('Authorization') token) {
    return this.authService.validateUserToken(token);
  }
}
