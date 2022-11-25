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
  async login(user: any) {
    const payload = {
      user: {
        id: user.id,
        email: user.email
      }
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data) {
    console.log('=============================')
    data.password = await bcrypt.hash(data.password, 10)
    console.log("🚀 -------------------------------------------------------------------------------------------🚀")
    console.log("🚀 ~ file: auth.service.ts ~ line 70 ~ AuthService ~ register ~ data.password", data.password)
    console.log("🚀 -------------------------------------------------------------------------------------------🚀")
    // let response = await this.usersService.create(data);
    // console.log("🚀 ---------------------------------------------------------------------------------🚀")
    // console.log("🚀 ~ file: auth.service.ts ~ line 71 ~ AuthService ~ register ~ response", response)
    // console.log("🚀 ---------------------------------------------------------------------------------🚀")
    // if (response) {
    //   const { password, ...result } = response;
    //   return result;
    // }
  }

  async testAPI(data: User) {
    // var a = await bcrypt.hash(data.pass, 10)
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
