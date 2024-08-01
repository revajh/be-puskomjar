import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerModule } from './owner/owner.module';
import { WebsiteModule } from './website/website.module';
import { PrismaService } from './prisma/prisma.service';
import { WebsiteController } from './website/website.controller';
import { AppController } from './app.controller';
import { AppService } from './App.service';

@Module({
  imports: [WebsiteModule, OwnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


