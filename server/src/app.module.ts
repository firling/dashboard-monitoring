import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SshKeyService } from './sshkey.service';
import { PrismaService } from './prisma.service';
import { ServerService } from './server.service';
import { ServiceService } from './service.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PrismaService, SshKeyService, ServerService, ServiceService],
})
export class AppModule {}
