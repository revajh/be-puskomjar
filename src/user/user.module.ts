import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';


@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey', 
      signOptions: { expiresIn: '7d' }, 
    }),
  ],
  providers: [UserService, PrismaService,], 
  exports: [UserService,JwtModule],
})
export class UserModule {}
