import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Server, Prisma } from '@prisma/client';

@Injectable()
export class ServerService {
  constructor(private prisma: PrismaService) {}

  async server(
    serverWhereUniqueInput: Prisma.ServerWhereInput,
  ): Promise<Server | null> {
    return this.prisma.server.findFirst({
      where: serverWhereUniqueInput,
    });
  }

  async servers(): Promise<Server[]> {
    return this.prisma.server.findMany();
  }

  async createServer(data: Prisma.ServerCreateInput): Promise<Server> {
    return this.prisma.server.create({
      data,
    });
  }

  async updateServer(params: {
    where: Prisma.ServerWhereUniqueInput;
    data: Prisma.ServerUpdateInput;
  }): Promise<Server> {
    const { where, data } = params;
    return this.prisma.server.update({
      data,
      where,
    });
  }

  async deleteServer(where: Prisma.ServerWhereUniqueInput): Promise<Server> {
    return this.prisma.server.delete({
      where,
    });
  }
}