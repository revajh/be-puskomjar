import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerModule } from './owner/owner.module';
import { WebsiteModule } from './website/website.module';
import { PrismaService } from './prisma/prisma.service';
import { WebsiteController } from './website/website.controller';
import { AppController } from './app.controller';
import { AppService } from './App.service';
import { RequestModule } from './request/request.module';

@Module({
  imports: [WebsiteModule, OwnerModule, RequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


