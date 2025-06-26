import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEmpleadoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo ci es obligatorio' })
  @IsString({ message: 'El campo ci debe ser de tipo cadena' })
  @MaxLength(30, { message: 'El campo ci no debe ser mayor a 50 caracteres' })
  readonly ci: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo nombre no debe ser mayor a 50 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsString({ message: 'El apellido paterno debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El apellido paterno  no debe ser mayor a 50 caracteres',
  })
  readonly apellidoPaterno: string;

  @ApiProperty()
  @IsString({ message: 'El apellido materno debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El apellido materno no debe ser mayor a 50 caracteres',
  })
  readonly apellidoMaterno: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo direccion no debe ser vacío' })
  @IsString({ message: 'El campo direccion debe ser de tipo cadena' })
  @MaxLength(60, {
    message: 'El campo direccion no debe ser mayor a 100 caracteres',
  })
  readonly direccion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo  celular no debe ser vacío' })
  @IsString({ message: 'El campo celular debe ser de tipo cadena' })
  @MaxLength(20, {
    message: 'El campo celular no debe ser mayor a 12 caracteres',
  })
  readonly celular: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo cargo no debe ser vacío' })
  @IsString({ message: 'El campo cargo debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo cargo no debe ser mayor a 12 caracteres',
  })
  readonly cargo: string;
}
