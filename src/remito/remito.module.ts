import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Remito } from './entities/remito.entity';
import { RemitoService } from './remito.service';
import { RemitoController } from './remito.controller';
import { Client } from 'src/client/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Remito, Client])],
  controllers: [RemitoController],
  providers: [RemitoService],
  exports: [RemitoService, TypeOrmModule],
})
export class RemitoModule {}
