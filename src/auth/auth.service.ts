import { User } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  // async validateUser(email: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne2({ "email": email });
  //   console.log(await bcrypt.hash(pass, 10));
  //   if (user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne2({ "email": email });
    console.log(await bcrypt.hash(pass, 10));
    if (user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //     user: {}
  //   };
  // }
  async login(user: User) {
    // console.log(user.user);
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        name: user.f_name,
        created_at: user.created_at,
        updated_at: user.updated_at
      }
    };
    // console.log({payload});
    return {
      access_token: this.jwtService.sign(payload),
    };

  }

  async register(data) {
    data.password = await bcrypt.hash(data.password, 10)
    let response = await this.usersService.create(data);
    if (response) {
      const { password, ...result } = response;
      return result;
    }
  }

  decodeToken(token): any {
    return this.jwtService.decode(token)
  }
}
