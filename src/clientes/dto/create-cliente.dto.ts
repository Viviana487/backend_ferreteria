import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe estar vacio' })
  @IsString({ message: 'El nombre debe ser de tipo cadena' })
  @MaxLength(150, {
    message: 'El campo nombre no debe ser mayor a 150 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Ci/Nit no debe ser vacío' })
  @IsString({ message: 'El campo Ci/Nit debe ser de tipo cadena' })
  @MaxLength(12, {
    message: 'El campo Ci/Nit no debe ser mayor a 12 caracteres',
  })
  readonly ciNit: string;
}
