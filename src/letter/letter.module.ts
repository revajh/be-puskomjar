import { Module } from '@nestjs/common';
import { LetterService } from './letter.service';
import { LetterController } from './letter.controller';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  providers: [LetterService, PrismaService],
  controllers: [LetterController],
  exports: [LetterService], 
})
export class LetterModule {}
