// src/clients/clients.seed.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';

@Injectable()
export class ClientsSeed implements OnModuleInit {
  private readonly logger = new Logger(ClientsSeed.name);

  constructor(
    @InjectRepository(Client)
    private readonly clientsRepo: Repository<Client>,
  ) {}

  async onModuleInit() {
    try {
      this.logger.log('🚀 Inicializando cliente por defecto (Consumidor Final)...');

      const exists = await this.clientsRepo.findOne({
        where: { isFinalConsumer: true }
      });

      if (exists) {
        this.logger.debug('ℹ️ Consumidor Final ya existe, no se crea otro.');
        return;
      }

      const finalConsumer = this.clientsRepo.create({
        name: 'Consumidor',
        lastName: 'Final',
        isFinalConsumer: true,
        totalDebtCache: 0,
      });

      await this.clientsRepo.save(finalConsumer);
      this.logger.log('✅ Consumidor Final creado correctamente');
    } catch (error) {
      this.logger.error('❌ Error durante la inicialización de Consumidor Final:', error);
    }
  }
}
