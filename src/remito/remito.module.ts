import { Module } from '@nestjs/common';
import { RemitosService } from './remito.service';
import { RemitosController } from './remito.controller';
import { Remito } from './entities/remito.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from 'src/sale/entities/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Remito, Sale])],
  controllers: [RemitosController],
  providers: [RemitosService],
})
export class RemitoModule {}
