import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; 
import { CreateLetterDto } from './dto/create-letter.dto';
import { Letter } from '@prisma/client';
import { UpdateLetterDto } from './dto/update-latter.dto';

@Injectable()
export class LetterService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(q?: string, limit: number = 20): Promise<Letter[]> {
    return this.prisma.letter.findMany({
      where: {
        AND: [
          q
            ? {
                OR: [
                  { about: { contains: q, mode: 'insensitive' } },
                  { link: { contains: q, mode: 'insensitive' } },
                ],
              }
            : {},
          { is_active: true }, 
        ],
      },
      take: limit,
      include: {
        owner: {
          select: {
            name: true,
            alias: true,
          },
        },
      },
    });
  }
  
  
  async findOne(id: number): Promise<Letter> {
    const letter = await this.prisma.letter.findUnique({
      where: { id },
    });
    if (!letter) {
      throw new NotFoundException(`id ${id} tidak ada `);
    }
    return letter;
  }

  async createLetter(createLetterDto: CreateLetterDto): Promise<Letter> {
    const {  about, date_of_letter, link, ownerId } = createLetterDto;

    return this.prisma.letter.create({
      data: {
        about,
        date_of_letter,
        link,
        owner: ownerId ? { connect: { id: ownerId } } : undefined,
      },
    });
  }

  async update(id: number, updateLetterDto: UpdateLetterDto): Promise<Letter> {
    const { number, about, date_of_letter, link, ownerId } = updateLetterDto;

    const existingLetter = await this.prisma.letter.findUnique({
      where: { id },
    });
    if (!existingLetter) {
      throw new NotFoundException(`Letter with ID ${id} not found`);
    }

    return this.prisma.letter.update({
      where: { id },
      data: {
        about,
        date_of_letter,
        link,
        owner: ownerId !== undefined ? { connect: { id: ownerId } } : undefined,
      },
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const latter = await this.prisma.letter.findUnique({
      where: { id },
    });
  
    if (!latter) {
      throw new NotFoundException(`ID ${id} tidak ditemukan.`);
    }
  
    await this.prisma.letter.update({
      where: { id },
      data: { is_active: false },
    });
  
    return { message: 'letter berhasil dinonaktifkan.' };
  }
  
}
