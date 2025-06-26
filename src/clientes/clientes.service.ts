import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
  ) {}

  async create(CreateClienteDto: CreateClienteDto): Promise<Cliente> {
    const existe = await this.clientesRepository.findOneBy({
      nombre: CreateClienteDto.nombre.trim(),
      ciNit: CreateClienteDto.ciNit.trim(),
    });

    if (existe) throw new ConflictException('El Cliente ya existe');

    const cliente = new Cliente();
    cliente.nombre = CreateClienteDto.nombre.trim();
    cliente.ciNit = CreateClienteDto.ciNit.trim();
    return this.clientesRepository.save(cliente);
  }

  async findAll() {
    return this.clientesRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<Cliente> {
    const clientes = await this.clientesRepository.findOneBy({ id });
    if (!clientes) throw new NotFoundException('La Cliente no existe');
    return clientes;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const clientes = await this.findOne(id);
    const clienteUpdate = Object.assign(clientes, updateClienteDto);
    return this.clientesRepository.save(clienteUpdate);
  }

  async remove(id: number) {
    const clientes = await this.findOne(id);
    if (clientes) return this.clientesRepository.softRemove(clientes);
  }
}
