import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentAllocation } from './entities/payment-allocation.entity';

@Injectable()
export class PaymentAllocationService {
  constructor(
    @InjectRepository(PaymentAllocation)
    private readonly repo: Repository<PaymentAllocation>,
  ) {}

  findByPayment(paymentId: string) {
    return this.repo.find({
      where: { payment: { id: paymentId } },
      relations: ['sale'],
    });
  }
}
