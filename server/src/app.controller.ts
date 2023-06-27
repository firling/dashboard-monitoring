import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SshKeyService } from './sshkey.service';
import { SshKey, Server, Service } from '.prisma/client';
import { ServerService } from './server.service';
import { ServiceService } from './service.service';
import { NodeSSH } from 'node-ssh';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sshkeyService: SshKeyService,
    private readonly serverService: ServerService,
    private readonly serviceService: ServiceService,
  ) {}

  @Get('sshkeys')
  getKeys(): Promise<SshKey[]> {
    return this.sshkeyService.sshKeys();
  }

  @Post('sshkeys')
  async createKeys(
    @Body() key: { name: string; key: string },
  ): Promise<SshKey> {
    return this.sshkeyService.createKey(key);
  }

  @Delete('sshkeys')
  async deleteKeys(@Body() key: { id: number }): Promise<SshKey> {
    return this.sshkeyService.deleteKey(key);
  }

  @Get('servers')
  getServers(): Promise<Server[]> {
    return this.serverService.servers();
  }

  @Post('servers')
  async createServers(
    @Body() server: { 
      name: string;
      ip: string;
      login: string;
      sshkey: number;
     },
  ): Promise<Server> {
    const {sshkey, ...rest} = server;
    return this.serverService.createServer({
      ...rest,
      sshkey: {
        connect: {
          id: +sshkey,
        },
      },
    });
  }

  @Delete('servers')
  async deleteServers(@Body() server: { id: number }): Promise<Server> {
    return this.serverService.deleteServer(server);
  }

  @Get('services')
  getServices(): Promise<Service[]> {
    return this.serviceService.services();
  }

  @Post('services')
  async createServices(
    @Body() service: {
      name: string;
      path: string;
      server: number;
    },
  ): Promise<Service> {
    const {server, ...rest} = service;
    return this.serviceService.createService({
      ...rest,
      server: {
        connect: {
          id: +server,
        },
      },
    });
  }

  @Delete('services')
  async deleteServices(@Body() service: { id: number }): Promise<Service> {
    return this.serviceService.deleteService(service);
  }

  @Get('restartService/:id')
  async restartService(@Param('id') id): Promise<String> {
    const serviceData = await this.serviceService.service({
      id: +id,
    });

    const serverData = await this.serverService.server({
      id: serviceData.serverId,
    });

    const sshkeyData = await this.sshkeyService.sshKey({
      id: serverData.sshkeyId,
    });

    const ssh = new NodeSSH();

    await ssh.connect({
      host: serverData.ip,
      username: serverData.login,
      privateKey: sshkeyData.key,
    })

    const resSsh = await ssh.execCommand(`cd ${serviceData.path} && docker compose restart`);

    return resSsh.stderr;
  }
}
