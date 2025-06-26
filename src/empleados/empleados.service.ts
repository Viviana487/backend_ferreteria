import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private empleadosRepository: Repository<Empleado>,
  ) {}

  async create(CreateEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    const existe = await this.empleadosRepository.findOneBy({
      ci: CreateEmpleadoDto.ci.trim(),
      nombre: CreateEmpleadoDto.nombre.trim(),
      apellidoPaterno: CreateEmpleadoDto.apellidoPaterno.trim(),
      apellidoMaterno: CreateEmpleadoDto.apellidoMaterno.trim(),
      direccion: CreateEmpleadoDto.direccion.trim(),
      celular: CreateEmpleadoDto.celular.trim(),
      cargo: CreateEmpleadoDto.cargo.trim(),
    });

    if (existe) throw new ConflictException('La Empleado ya existe');

    const empleado = new Empleado();
    empleado.ci = CreateEmpleadoDto.ci.trim();
    empleado.nombre = CreateEmpleadoDto.nombre.trim();
    empleado.apellidoPaterno = CreateEmpleadoDto.apellidoPaterno.trim();
    empleado.apellidoMaterno = CreateEmpleadoDto.apellidoMaterno.trim();
    empleado.direccion = CreateEmpleadoDto.direccion.trim();
    empleado.celular = CreateEmpleadoDto.celular.trim();
    empleado.cargo = CreateEmpleadoDto.cargo.trim();
    return this.empleadosRepository.save(empleado);
  }

  async findAll() {
    return this.empleadosRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<Empleado> {
    const empleados = await this.empleadosRepository.findOneBy({ id });
    if (!empleados) throw new NotFoundException('La Empleado no existe');
    return empleados;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    const empleados = await this.findOne(id);
    const empleadoUpdate = Object.assign(empleados, updateEmpleadoDto);
    return this.empleadosRepository.save(empleadoUpdate);
  }

  async remove(id: number) {
    const empleados = await this.findOne(id);
    if (empleados) return this.empleadosRepository.softRemove(empleados);
  }
}
