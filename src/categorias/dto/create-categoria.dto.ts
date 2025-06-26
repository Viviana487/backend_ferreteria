import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Nombre no debe ser vacío' })
  @IsString({ message: 'El campo Nombre debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo Nombre no debe ser mayor a 50 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Descripción no debe ser vacío' })
  @IsString({ message: 'El campo Descripción debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo Descripcion no debe ser mayor a 100 caracteres',
  })
  readonly descripcion: string;
}
