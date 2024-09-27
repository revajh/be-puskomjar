import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Website } from '@prisma/client';
import { UpdateWebsiteDto } from './dto/update-website,dto';


@Injectable()
export class WebsiteService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(q: string): Promise<Website[]> {
    return this.prisma.website.findMany({
      where: {
        is_active: true,
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { link: { contains: q, mode: 'insensitive' } },
          { provider: { contains: q, mode: 'insensitive' } },
        ],
      },
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

  async findOne(id: number): Promise<Website> {
    const website = await this.prisma.website.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            name: true,
            alias: true,
          },
        },
      },
    });

    if (!website) {
      throw new NotFoundException(`id ${id} gak ada `);
    }

    return website; 
  }


  async createWebsite(data: Prisma.WebsiteCreateInput): Promise<Website> {
    console.log(data)
    try {
      return this.prisma.website.create({data});
    } catch (error) {
      console.error('Error in createWebsite service:', error);
      throw new Error('Failed to create website');
    }
  }

  async update(id: string, updateWebsiteDto: UpdateWebsiteDto): Promise<Website>{
    const website = await this.prisma.website.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!website) {
      throw new NotFoundException(`maaf ya kak ID gak di temukan,hayo loh id nya gak ada `);
    }

    return this.prisma.website.update({
      where: { id: parseInt(id, 10) },
      data: updateWebsiteDto,
    });
  }

  

  async remove(id: number): Promise<{ message: string }> {
    const website = await this.prisma.website.findUnique({
      where: { id },
    });
  
    if (!website) {
      throw new NotFoundException(`ID ${id} tidak ditemukan.`);
    }
  
    await this.prisma.website.update({
      where: { id },
      data: { is_active: false },
    });
  
    return { message: 'Website berhasil dinonaktifkan.' };
  }
  
}
