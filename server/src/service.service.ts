import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Server, Prisma, Service } from '@prisma/client';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async service(
    serviceWhereUniqueInput: Prisma.ServiceWhereInput,
  ): Promise<Service | null> {
    return this.prisma.service.findFirst({
      where: serviceWhereUniqueInput,
    });
  }

  async services(): Promise<Service[]> {
    return this.prisma.service.findMany();
  }

  async createService(data: Prisma.ServiceCreateInput): Promise<Service> {
    return this.prisma.service.create({
      data,
    });
  }

  async updateService(params: {
    where: Prisma.ServiceWhereUniqueInput;
    data: Prisma.ServiceUpdateInput;
  }): Promise<Service> {
    const { where, data } = params;
    return this.prisma.service.update({
      data,
      where,
    });
  }

  async deleteService(where: Prisma.ServiceWhereUniqueInput): Promise<Service> {
    return this.prisma.service.delete({
      where,
    });
  }
}