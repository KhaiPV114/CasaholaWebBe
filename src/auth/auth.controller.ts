import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPWTokenDto } from './dto/resetPWToken.dto';
import { AuthenticationGruad } from 'src/gruads/authentication.gruad';
import { GoogleLoginDto } from './dto/googleLogin.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Post('login/local')
  async loginLocal(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @Post('login/google')
  async loginGoogle(@Body() googleLoginDto : GoogleLoginDto) {
    return this.authService.verifyGoogleLogin(googleLoginDto.token)
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const { token } = refreshTokenDto;
    return this.authService.refreshToken(token)
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    return this.authService.forgotPassword(email)
  }

  @Put('change-password')
  @UseGuards(AuthenticationGruad)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req: any) {
    this.authService.changePassword(req.userId, changePasswordDto)
  }

  @Put('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPWTokenDto) {
    this.authService.resetPassword(resetPasswordDto)
  }
}
