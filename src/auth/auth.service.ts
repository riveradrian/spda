import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginUserInput } from './dto/login-user.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserInput: LoginUserInput) {
    const user = await this.userService.findOneByEmail(loginUserInput.email);
    if (user.password !== loginUserInput?.password) {
      throw new UnauthorizedException();
    }

    await this.userService.update(user.id, { authenticated: true });

    return {
      access_token: await this.jwtService.signAsync({
        email: user.email,
        sub: user.id,
      }),
      user,
    };
  }
}
