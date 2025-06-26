import { PartialType } from '@nestjs/mapped-types';
import { CreateVentaDetalleDto } from './create-venta_detalle.dto';

export class UpdateVentaDetalleDto extends PartialType(CreateVentaDetalleDto) {}
