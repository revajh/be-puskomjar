import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';


@Controller('auth')

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  
  @Post('login')
  async Login(@Body()loginUserDto: LoginDto){
    return this.userService.loginUser(loginUserDto)
  }
  @Post('refresh') async refreshToken(@Body('refreshToken') refreshToken: string)
   { return this.userService.refreshToken(refreshToken); }
}