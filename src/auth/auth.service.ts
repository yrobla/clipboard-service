import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    if (
        this.configService.get<string>('HTTP_BASIC_USER') === username &&
        this.configService.get<string>('HTTP_BASIC_PASS') === pass
    ) {
        return { "user": username };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }  
}