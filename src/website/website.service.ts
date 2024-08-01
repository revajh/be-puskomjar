import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Website } from '@prisma/client';


@Injectable()
export class WebsiteService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Website[]> {
    return this.prisma.website.findMany({
      include: { owner: true },
    });
  }

  async findOne(id: number): Promise<Website | null> {
    return this.prisma.website.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.WebsiteCreateInput): Promise<Website> {
    return this.prisma.website.create({
      data,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.website.delete({
      where: { id },
    });
  }
}
