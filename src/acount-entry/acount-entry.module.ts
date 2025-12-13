import { Module } from '@nestjs/common';
import { AcountEntryService } from './acount-entry.service';
import { AcountEntryController } from './acount-entry.controller';
import { AccountEntry } from './entities/acount-entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntry])],
  controllers: [AcountEntryController],
  providers: [AcountEntryService],
})
export class AcountEntryModule {}
