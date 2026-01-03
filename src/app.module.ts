import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './common/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { InitialSeeder } from './common/seeds/seed.superadmin';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';
import { ClientModule } from './client/client.module';
import { CashRegisterModule } from './cash-register/cash-register.module';
import { CashMovementModule } from './cash-movement/cash-movement.module';
import { CashMovement } from './cash-movement/entities/cash-movement.entity';
import { CashRegister } from './cash-register/entities/cash-register.entity';
import { Client } from './client/entities/client.entity';
import { SaleModule } from './sale/sale.module';
import { SaleItemModule } from './sale-item/sale-item.module';
import { RemitoModule } from './remito/remito.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentAllocationModule } from './payment-allocation/payment-allocation.module';
import { AccountEntryModule } from './acount-entry/acount-entry.module';
import { SupplierModule } from './supplier/supplier.module';
import { PurchaseModule } from './purchase/purchase.module';
import { PurchaseItemModule } from './purchase-item/purchase-item.module';
import { SupplierPaymentModule } from './supplier-payment/supplier-payment.module';
import { SupplierAccountEntryModule } from './supplier-account-entry/supplier-account-entry.module';
import { Sale } from './sale/entities/sale.entity';
import { ClientsSeed } from './common/seeds/seedconsumidorFinal';
import { AccountAdjustmentModule } from './account-adjustment/account-adjustment.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PosModule } from './pos/pos.module';
import { ReportsModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    
    // 👇 AQUI activas tu configuración de TypeORM
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getTypeOrmConfig
    }),

    TypeOrmModule.forFeature([User, Role, CashMovement, CashRegister, Client]),
    UserModule,
    AuthModule,
    ClientModule,
    CashRegisterModule,
    CashMovementModule,
    SaleModule,
    SaleItemModule,
    RemitoModule,
    PaymentModule,
    PaymentAllocationModule,
    AccountEntryModule,
    SupplierModule,
    PurchaseModule,
    PurchaseItemModule,
    SupplierPaymentModule,
    SupplierAccountEntryModule,
    AccountAdjustmentModule,
    CloudinaryModule,
    PosModule,
    ReportsModule
  ],
  providers: [InitialSeeder, ClientsSeed]
})
export class AppModule {}
