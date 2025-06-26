import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasDetallesService } from './ventas_detalles.service';
import { VentasDetallesController } from './ventas_detalles.controller';
import { VentaDetalle } from './entities/venta_detalle.entity';
import { Producto } from '../productos/entities/producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VentaDetalle, Producto]),
    VentasDetallesModule,
  ],
  controllers: [VentasDetallesController],
  providers: [VentasDetallesService],
  exports: [VentasDetallesService],
})
export class VentasDetallesModule {}