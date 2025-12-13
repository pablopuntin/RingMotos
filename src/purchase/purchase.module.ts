import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { Purchase } from './entities/purchase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
