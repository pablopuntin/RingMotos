import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntry } from './entities/acount-entry.entity';
import { Client } from 'src/client/entities/client.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { CreateAccountEntryDto } from './dto/create-acount-entry.dto';
import { Between } from 'typeorm';

@Injectable()
export class AccountEntryService {
  constructor(
    @InjectRepository(AccountEntry)
    private readonly repo: Repository<AccountEntry>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,

    @InjectRepository(Sale)
    private readonly saleRepo: Repository<Sale>,

    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  /**
   * Obtiene el último balance del cliente
   */
  async getLastBalance(clientId: string): Promise<number> {
    const last = await this.repo.findOne({
      where: { client: { id: clientId } },
      order: { createdAt: 'DESC' },
    });

    return last ? Number(last.balanceAfter) : 0;
  }

  /**
   * Crea un nuevo movimiento de cuenta corriente
   */
  async create(dto: CreateAccountEntryDto) {
    const client = await this.clientRepo.findOneBy({ id: dto.clientId });
    if (!client) throw new BadRequestException('Cliente no encontrado');

    const lastBalance = await this.getLastBalance(client.id);

   let sale: Sale | null = null;
let payment: Payment | null = null;


    if (dto.saleId) {
      sale = await this.saleRepo.findOneBy({ id: dto.saleId });
      if (!sale) throw new BadRequestException('Venta no encontrada');
    }

    if (dto.paymentId) {
      payment = await this.paymentRepo.findOneBy({ id: dto.paymentId });
      if (!payment) throw new BadRequestException('Pago no encontrado');
    }

    const newBalance =
      dto.type === 'PAYMENT'
        ? lastBalance - Number(dto.amount)
        : lastBalance + Number(dto.amount);

    const entry = this.repo.create({
  client: client,
  type: dto.type,
  sale: sale,
  payment: payment,
  amount: dto.amount,
  balanceAfter: newBalance,
  description: dto.description,
  status: dto.status ?? 'ACTIVE',
} as Partial<AccountEntry>);

    return this.repo.save(entry);
  }

  /**
   * Cuenta corriente completa del cliente
   */
  findByClient(clientId: string) {
    return this.repo.find({
      where: { client: { id: clientId } },
      order: { createdAt: 'ASC' },
      relations: ['sale', 'payment'],
    });
  }

  // Historial completo de compras y pagos 
  async getHistory(clientId: string, start?: Date, end?: Date) { 
    return this.repo.find({ 
      where: { 
        client: { id: clientId }, 
        ...(start && end ? { createdAt: Between(start, end) } : {}), 
      }, 
      order: { createdAt: 'ASC' }, 
      relations: ['sale', 'payment'], 
    }); 
  } 
  // Resumen mensual: compras, pagos, deuda 
  async getMonthlySummary(clientId: string, month: number, year: number) { 
    const start = new Date(year, month - 1, 1); 
    const end = new Date(year, month, 0, 23, 59, 59);

    const entries = await this.getHistory(clientId, start, end); 
    
    const charges = entries 
    .filter(e => e.type === 'CHARGE') 
    .reduce((sum, e) => sum + Number(e.amount), 0); 
    
    const payments = entries 
    .filter(e => e.type === 'PAYMENT') 
    .reduce((sum, e) => sum + Number(e.amount), 0); 
    
    const adjustments = entries 
    .filter(e => e.type === 'ADJUSTMENT') 
    .reduce((sum, e) => sum + Number(e.amount), 0); 
    
    const lastBalance = entries.length 
    ? Number(entries[entries.length - 1].balanceAfter)
     : 0; 
     
     return { charges, payments, adjustments, lastBalance }; 
    }
}
