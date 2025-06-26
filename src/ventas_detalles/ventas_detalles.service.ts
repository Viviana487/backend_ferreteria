import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVentaDetalleDto } from './dto/create-venta_detalle.dto';
import { UpdateVentaDetalleDto } from './dto/update-venta_detalle.dto';
import { VentaDetalle } from './entities/venta_detalle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class VentasDetallesService {
  constructor(
    @InjectRepository(VentaDetalle)
  private ventasRepository: Repository<VentaDetalle>,
  @InjectRepository(Producto)
  private productosRepository: Repository<Producto>,
  ) {}

  async create(
    createVentaDetalleDto: CreateVentaDetalleDto,
  ): Promise<VentaDetalle> {
    const existe = await this.ventasRepository.findOneBy({
      idVenta: createVentaDetalleDto.idVenta,
      idProducto: createVentaDetalleDto.idProducto,
    });

    if (existe) throw new ConflictException('El detalle de la venta ya existe');

    // Descontar saldo del producto
    const producto = await this.productosRepository.findOneBy({ id: createVentaDetalleDto.idProducto });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    if (producto.saldo < createVentaDetalleDto.cantidad) throw new ConflictException('Stock insuficiente');
    producto.saldo -= createVentaDetalleDto.cantidad;
    await this.productosRepository.save(producto);

    const ventaDetalle = new VentaDetalle();
    ventaDetalle.idVenta = createVentaDetalleDto.idVenta!; // <-- aquí va el signo !
    ventaDetalle.idProducto = createVentaDetalleDto.idProducto;
    ventaDetalle.precioUnitario = createVentaDetalleDto.precioUnitario;
    ventaDetalle.total = createVentaDetalleDto.total;
    ventaDetalle.cantidad = createVentaDetalleDto.cantidad;

    return this.ventasRepository.save(ventaDetalle);
  }

  async findAll(): Promise<VentaDetalle[]> {
    return this.ventasRepository.find({
      relations: {
        producto: true,
        venta: {
          cliente: true,
          usuario: true,
        },
      },
      select: {
        id: true,
        idProducto: true, // necesario
        idVenta: true, // necesario
        precioUnitario: true,
        total: true,
        cantidad: true,
        producto: {
          id: true,
          codigo: true,
          descripcion: true,
          precioVenta: true,
          saldo: true,
          unidadMedida: true,
        },
        venta: {
          id: true,
          fecha: true,
          cliente: { nombre: true },
          usuario: { usuario: true }, // o nombre si tienes ese campo
        },
      },
    });
  }

  async findOne(id: number): Promise<VentaDetalle> {
    const ventaDetalle = await this.ventasRepository.findOne({
      where: { id },
      relations: { venta: true, producto: true },
    });
    if (!ventaDetalle)
      throw new NotFoundException('El detalle de la venta no existe');
    return ventaDetalle;
  }

  async findAllByVenta(idVenta: number): Promise<VentaDetalle[]> {
    return this.ventasRepository.findBy({ idVenta });
  }

  async findAllByProducto(idProducto: number): Promise<VentaDetalle[]> {
    return this.ventasRepository.findBy({ idProducto });
  }

  async update(id: number, updateVentaDetalleDto: UpdateVentaDetalleDto) {
    const ventaDetalle = await this.findOne(id);
    const ventaDetalleUpdate = Object.assign(
      ventaDetalle,
      updateVentaDetalleDto,
    );
    return this.ventasRepository.save(ventaDetalleUpdate);
  }

  async remove(id: number) {
    const ventaDetalle = await this.findOne(id);
    if (ventaDetalle) return this.ventasRepository.softRemove(ventaDetalle);
  }
}
