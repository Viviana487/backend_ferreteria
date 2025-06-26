import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { VentasDetallesService } from '../ventas_detalles/ventas_detalles.service';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventasRepository: Repository<Venta>,
    private readonly ventasDetallesService: VentasDetallesService, // Inyectar el servicio aquí
  ) {}

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    const venta = new Venta();
    venta.idCliente = createVentaDto.idCliente;
    venta.idUsuario = createVentaDto.idUsuario;
    venta.fecha = createVentaDto.fecha;
    venta.transaccion = createVentaDto.transaccion;
    venta.cantidad = createVentaDto.cantidad;
    const ventaGuardada = await this.ventasRepository.save(venta);

    // Guardar cada detalle
    for (const detalle of createVentaDto.detalles) {
      await this.ventasDetallesService.create({
        ...detalle,
        idVenta: ventaGuardada.id, // Asigna el id de la venta recién creada
      });
    }

    return ventaGuardada;
  }

  async findAll(): Promise<Venta[]> {
    return this.ventasRepository.find({
      relations: { cliente: true, usuario: true },
      select: {
        id: true,
        fecha: true,
        transaccion: true,
        cantidad: true,
        cliente: { id: true, nombre: true, ciNit: true },
        usuario: { id: true },
      },
    });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventasRepository.findOne({
      where: { id },
      relations: { cliente: true, usuario: true },
    });
    if (!venta) throw new NotFoundException('La venta no existe');
    return venta;
  }

  async findAllByCliente(idCliente: number): Promise<Venta[]> {
    return this.ventasRepository.findBy({ idCliente });
  }

  async findAllByUsuario(idUsuario: number): Promise<Venta[]> {
    return this.ventasRepository.findBy({ idUsuario });
  }

  async update(id: number, updateVentaDto: UpdateVentaDto) {
    const venta = await this.findOne(id);
    const ventaUpdate = Object.assign(venta, updateVentaDto);
    return this.ventasRepository.save(ventaUpdate);
  }

  async remove(id: number) {
    const venta = await this.findOne(id);
    if (venta) return this.ventasRepository.softRemove(venta);
  }
}
