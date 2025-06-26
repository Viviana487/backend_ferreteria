import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, IsDefined, IsNumber } from 'class-validator';

export class CreateVentaDetalleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: 'El campo idVenta debe ser de tipo numérico' })
  idVenta?: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo idProducto debe estar definido' })
  @IsInt({ message: 'El campo idProducto debe ser de tipo numérico' })
  idProducto: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo precioUnitario debe estar definido' })
  @IsNumber(
    {},
    { message: 'El campo precioUnitario debe ser de tipo numérico' },
  )
  precioUnitario: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo total debe estar definido' })
  @IsNumber({}, { message: 'El campo total debe ser de tipo numérico' })
  total: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo cantidad debe estar definido' })
  @IsInt({ message: 'El campo cantidad debe ser de tipo numérico' })
  cantidad: number;
}
