import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Owner } from '@prisma/client';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnerService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(q: string,): Promise<Owner[]> {
    if (q) {
      return this.prisma.owner.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { alias: { contains: q, mode: 'insensitive' } },
          ],
        },
      });
    } else {
      return this.prisma.owner.findMany({
        where: {is_active:true},

      });
    }
  }
  

  async findOne(id: number): Promise<Owner | null> {

    const owner = await this.prisma.owner.findUnique({
      where: { id },
    });
    if (!owner) {
      throw new NotFoundException(`ID ${id} tidak ditemukan.`);
    }
    return owner;
  }

  async createOwner(createOwnerDto: CreateOwnerDto) {
    return this.prisma.owner.create({
      data: {
        name: createOwnerDto.name,
        alias: createOwnerDto.alias,
      },
    });
  }

  async update(id: string, updateOwnerDto: UpdateOwnerDto): Promise<Owner> {
    const owner = await this.prisma.owner.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!owner) {
      throw new NotFoundException('maaf ya kak ID gak di temukan,hayo loh id nya gak ada');
    }

    const updateData: Prisma.OwnerUpdateInput = { ...updateOwnerDto };

    if (updateOwnerDto.is_active === undefined) {
      updateData.is_active = owner.is_active; 
    }

    return this.prisma.owner.update({
      where: { id: parseInt(id, 10) },
      data: updateData,
    });
  }


  
  async remove(id: number): Promise<{ message: string }> {
    const owner = await this.prisma.owner.findUnique({
      where: { id },
    });
  
    if (!owner) {
      throw new NotFoundException(`ID ${id} tidak ditemukan.`);
    }
  
    await this.prisma.owner.update({
      where: { id },
      data: { is_active: false },
    });
  
    return { message: 'owner berhasil dinonaktifkan.' };
  }
}