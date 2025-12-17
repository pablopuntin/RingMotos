import { Module } from '@nestjs/common';
import { ClientsService } from './client.service';
import { ClientsController } from './client.controller';
import { Client } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],

  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientModule {}
