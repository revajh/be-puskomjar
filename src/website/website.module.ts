import { Module } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { PrismaService } from '../prisma/prisma.service';
import { WebsiteController } from './website.controller';

@Module({
  controllers: [WebsiteController],
  providers: [WebsiteService, PrismaService],
})
export class WebsiteModule {}
