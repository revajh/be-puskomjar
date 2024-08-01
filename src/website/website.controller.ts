import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { Website } from '@prisma/client';

@Controller('websites')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Get()
  findAll() {
    return this.websiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Website | null> {
    return this.websiteService.findOne(+id);
  }

  @Post()
  create(@Body() websiteData: Partial<Website>): Promise<Website> {
    return this.websiteService.create(websiteData as any); 
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.websiteService.remove(+id);
  }
}
