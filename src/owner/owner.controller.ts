import { Controller, Get, Post, Body, Param,  Query, ValidationPipe, Patch, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { Owner, Prisma } from '@prisma/client';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';


@Controller('owners')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Get()
  async findAll(@Query('q') q: string,@Query('limit')limit: number = 5): Promise<Owner[]> {
    console.log(q)

    return this.ownerService.findAll(q);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Owner | null> {
    return this.ownerService.findOne(+id);
  }

  @Post()
  async createOwner(@Body(ValidationPipe) createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return this.ownerService.createOwner(createOwnerDto);
  }

  @Patch(':id')
  async updateOwner(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownerService.update(id, updateOwnerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.ownerService.remove(+id);  
  }
}
