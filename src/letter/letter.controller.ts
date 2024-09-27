import { Controller, Get, Post, Body, Param, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { LetterService } from './letter.service';
import { CreateLetterDto } from './dto/create-letter.dto';
import { Letter } from '@prisma/client';
import { UpdateLetterDto } from './dto/update-latter.dto';


@Controller('letters')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Get()
  async findAll(@Query('q') q?: string, @Query('limit') limit = 5): Promise<Letter[]> {
    return this.letterService.findAll(q, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Letter | null> {
    return this.letterService.findOne(+id);
  }

  @Post()
  async create(@Body() createLetterDto: CreateLetterDto): Promise<Letter> {
    return this.letterService.createLetter(createLetterDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLetterDto: UpdateLetterDto,
  ): Promise<Letter> {
    return this.letterService.update(+id, updateLetterDto);
  }

 
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.letterService.remove(+id);
  }
}
