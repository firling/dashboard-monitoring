import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SshKey, Prisma } from '@prisma/client';

@Injectable()
export class SshKeyService {
  constructor(private prisma: PrismaService) {}

  async sshKey(
    sshKeyWhereUniqueInput: Prisma.SshKeyWhereInput,
  ): Promise<SshKey | null> {
    return this.prisma.sshKey.findFirst({
      where: sshKeyWhereUniqueInput,
    });
  }

  async sshKeys(): Promise<SshKey[]> {
    return this.prisma.sshKey.findMany();
  }

  async createKey(data: Prisma.SshKeyCreateInput): Promise<SshKey> {
    return this.prisma.sshKey.create({
      data,
    });
  }

  async updateKey(params: {
    where: Prisma.SshKeyWhereUniqueInput;
    data: Prisma.SshKeyUpdateInput;
  }): Promise<SshKey> {
    const { where, data } = params;
    return this.prisma.sshKey.update({
      data,
      where,
    });
  }

  async deleteKey(where: Prisma.SshKeyWhereUniqueInput): Promise<SshKey> {
    return this.prisma.sshKey.delete({
      where,
    });
  }
}