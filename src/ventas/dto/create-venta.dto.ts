import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsDefined, IsInt, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CreateVentaDetalleDto } from 'src/ventas_detalles/dto/create-venta_detalle.dto';

export class CreateVentaDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idCliente debe estar definido' })
  @IsInt({ message: 'El campo idCliente debe ser de tipo numérico' })
  readonly idCliente: Cliente['id'];

  @ApiProperty()
  @IsDefined({ message: 'El campo idUsuario debe estar definido' })
  @IsInt({ message: 'El campo idUsuario debe ser de tipo numérico' })
  readonly idUsuario: Usuario['id'];

  @ApiProperty()
  @IsDefined({ message: 'El campo fecha debe estar definido' })
  @IsDateString({}, { message: 'El campo fecha debe ser tipo fecha' })
  readonly fecha: Date;

  @ApiProperty()
  @IsDefined({ message: 'El campo transaccion debe estar definido' })
  @IsNumber({}, { message: 'El campo transaccion debe ser de tipo numérico' })
  readonly transaccion: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo cantidad debe estar definido' })
  @IsNumber({}, { message: 'El campo cantidad debe ser de tipo numérico' })
  readonly cantidad: number;

  @ApiProperty({ type: [CreateVentaDetalleDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVentaDetalleDto)
  detalles: Omit<CreateVentaDetalleDto, 'idVenta'>[];
}