import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Owner } from '@prisma/client';

@Injectable()
export class OwnerService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Owner[]> {
    return this.prisma.owner.findMany();
  }

  async findOne(id: number): Promise<Owner | null> {
    return this.prisma.owner.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.OwnerCreateInput): Promise<Owner> {
    return this.prisma.owner.create({
      data,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.owner.delete({
      where: { id },
    });
  }
}
