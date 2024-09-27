import {Controller, Get, Post,Body,Param,Delete,Query,BadRequestException, Patch, UseGuards,} from '@nestjs/common';
import { WebsiteService } from './website.service';
import { Website, Prisma } from '@prisma/client';
import { CreateWebsiteDto } from './dto/create-website,dto';
import { UpdateWebsiteDto } from './dto/update-website,dto';



@Controller('website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Get()
 
  async findAll(@Query('q') q: string): Promise<Website[]> {
    console.log(q);

    return this.websiteService.findAll(q);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Website> {
    const websiteId = parseInt(id, 10);

    if (isNaN(websiteId)) {
      throw new BadRequestException('gak ada id nya ');
    }

    try {
      return await this.websiteService.findOne(websiteId);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async createWebsite(
    @Body() createWebsiteDto: CreateWebsiteDto,
  ): Promise<Website> {
    const { name, link, provider, payment_lastest, ownerId } = createWebsiteDto;
  
    try {
      return await this.websiteService.createWebsite({
        name,
        link,
        provider,
        payment_lastest,
        owner: { connect: { id: ownerId } },
      });
    } catch (error) {
      console.error('Error creating website:', error);
      throw new BadRequestException('Failed to create website');
    }
  }

  @Patch(':id')
  async updateWebsite(@Param('id') id: string, @Body() updateWebsiteDto: UpdateWebsiteDto) {
    return this.websiteService.update(id, updateWebsiteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.websiteService.remove(+id);  
  }
}
