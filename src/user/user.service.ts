import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  findById(id: any): any {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return newUser;
  }

  async loginUser(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
  
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException({
        response: {
          Status: 401,
          message: "tidak dapat di proses",
          URL: "https://localhost:4000/auth/login",
        },
      });
    }
  
    const payload = { username: user.username, sub: user.id };

    const accessToken = jwt.sign(payload, 'your_access_secret', { expiresIn: '15m' }); 
    const refreshToken = jwt.sign(payload, 'your_refresh_secret', { expiresIn: '7d' }); 

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: refreshToken }, 
    });
  
    return {
      response: {
        Status: 201,
        message: "berhasil di proses",
        URL: "https://localhost:4000/auth/login",
      },
      Data: {
        Message: "Email dan akun ada",
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = jwt.verify(token, 'refresh_secret') as { sub: string };

      const userId = parseInt(payload.sub, 10);
      
      if (isNaN(userId)) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user || user.refreshToken !== token) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newPayload = { username: user.username, sub: user.id };
      const newAccessToken = jwt.sign(newPayload, 'jwt_secret', { expiresIn: '1d' });

      return {
        accessToken: newAccessToken,
      };
    } catch (e) {
      console.error('Error refreshing token:', e.message);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
