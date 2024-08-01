import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { Owner, Prisma } from '@prisma/client';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Get()
  async findAll(): Promise<Owner[]> {
    return this.ownerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Owner | null> {
    return this.ownerService.findOne(+id);
  }

  @Post()
  async create(@Body() ownerData: Prisma.OwnerCreateInput): Promise<Owner> {
    return this.ownerService.create(ownerData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.ownerService.remove(+id);
  }
}
