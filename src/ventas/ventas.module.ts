import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { Venta } from './entities/venta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasDetallesModule } from '../ventas_detalles/ventas_detalles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venta]),
    VentasDetallesModule, // <-- Agrega esto aquí
  ],
  controllers: [VentasController],
  providers: [VentasService],
  exports: [VentasService],
})
export class VentasModule {}
