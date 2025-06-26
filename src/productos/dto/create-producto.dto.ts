import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';

export class CreateProductoDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idCategoria debe estar definido' })
  @IsInt({ message: 'El campo idCategoria debe ser de tipo numérico' })
  readonly idCategoria: Categoria['id'];

  @ApiProperty()
  @IsDefined({ message: 'El campo idProveedor debe estar definido' })
  @IsInt({ message: 'El campo idProveeedor debe ser de tipo numérico' })
  readonly idProveedor: Proveedor['id'];

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo código no debe estar vacio' })
  @IsString({ message: 'El codigo debe ser de tipo cadena' })
  readonly codigo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Ci/Nit no debe ser vacío' })
  @IsString({ message: 'El campo Ci/Nit debe ser de tipo cadena' })
  readonly descripcion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo precio de venta no debe ser vacío' })
  @IsNumber({}, { message: 'El campo precio de venta debe ser un número' })
  @Min(0, { message: 'El precio de venta no puede ser negativo' })
  readonly precioVenta: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo saldo no debe ser vacío' })
  @IsNumber({}, { message: 'El campo saldo debe ser un número' })
  @Min(0, { message: 'El campo saldo no puede ser negativo' })
  readonly saldo: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo unidad de medida no debe ser vacío' })
  @IsString({ message: 'El campo unidad de medida debe ser de tipo cadena' })
  readonly unidadMedida: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo fotografia no debe ser vacío' })
  @IsString({ message: 'El campo fotografia debe ser de tipo cadena' })
  readonly fotografia: string;
}
