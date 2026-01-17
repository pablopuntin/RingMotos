// // supplier-payments/supplier-payments.controller.ts
// import { Controller, Post, Body, Param } from '@nestjs/common';
// import { SupplierPaymentsService } from './supplier-payment.service';

// @Controller('supplier-payments')
// export class SupplierPaymentsController {
//   constructor(private readonly service: SupplierPaymentsService) {}

//   @Post()
//   create(@Body() dto: any) { return this.service.create(dto); }

//   @Post(':id/reverse')
//   reverse(@Param('id') id: string) { return this.service.reverse(id); }
// }

//ref
import { Controller, Post, Body, Param } from '@nestjs/common';
import { SupplierPaymentsService } from './supplier-payment.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateSupplierPaymentDto } from './dto/create-supplier-payment.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { AuthSwagger } from 'src/auth/decorators/auth-swagger.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Supplier Payments')
@AuthSwagger()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('superadmin')
@Controller('suppliers/:id/payments')
export class SupplierPaymentsController {
  constructor(private readonly service: SupplierPaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar pago a proveedor' })
  create(@Body() dto: CreateSupplierPaymentDto) {
    return this.service.create(dto);
  }

  @Post(':id/reverse')
  @ApiOperation({ summary: 'Revertir pago' })
  reverse(@Param('id') id: string) {
    return this.service.reverse(id);
  }
}
