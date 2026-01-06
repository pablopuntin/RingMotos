import { Module } from '@nestjs/common';
import { ClientsService } from './client.service';
import { ClientsController } from './client.controller';
import { Client } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Sale } from 'src/sale/entities/sale.entity';
import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Sale, AccountEntry]),
CloudinaryModule,
PassportModule,
AuthModule
],

  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientModule {}
