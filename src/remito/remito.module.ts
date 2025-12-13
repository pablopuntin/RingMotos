import { Module } from '@nestjs/common';
import { RemitoService } from './remito.service';
import { RemitoController } from './remito.controller';
import { Remito } from './entities/remito.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Remito])],
  controllers: [RemitoController],
  providers: [RemitoService],
})
export class RemitoModule {}
