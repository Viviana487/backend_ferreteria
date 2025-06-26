import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const existe = await this.productosRepository.findOneBy({
      idCategoria: createProductoDto.idCategoria,
      idProveedor: createProductoDto.idProveedor,
      codigo: createProductoDto.codigo.trim(),
      descripcion: createProductoDto.descripcion.trim(),
      precioVenta: createProductoDto.precioVenta,
      saldo: createProductoDto.saldo,
      unidadMedida: createProductoDto.unidadMedida.trim(),
      fotografia: createProductoDto.fotografia.trim(),
    });

    if (existe) throw new ConflictException('El Producto ya existe');

    const producto = new Producto();
    producto.idCategoria = createProductoDto.idCategoria;
    producto.idProveedor = createProductoDto.idProveedor;
    producto.codigo = createProductoDto.codigo.trim();
    producto.descripcion = createProductoDto.descripcion.trim();
    producto.precioVenta = createProductoDto.precioVenta;
    producto.saldo = createProductoDto.saldo;
    producto.unidadMedida = createProductoDto.unidadMedida.trim();
    producto.fotografia = createProductoDto.fotografia.trim();

    return this.productosRepository.save(producto);
  }

  async findAll() {
    return this.productosRepository.find({
      relations: { categoria: true, proveedor: true },
      select: {
        id: true,
        codigo: true,
        descripcion: true,
        precioVenta: true,
        saldo: true,
        unidadMedida: true,
        fotografia: true,
        categoria: { id: true, nombre: true },
        proveedor: { id: true, ciNit: true, razonSocial: true },
      },
    });
  }

  async findOne(id: number): Promise<Producto> {
    const productos = await this.productosRepository.findOne({
      where: { id },
      relations: { categoria: true, proveedor: true },
    });
    if (!productos) throw new NotFoundException('La Producto no existe');
    return productos;
  }

  async findAllByCategoria(idCategoria: number): Promise<Producto[]> {
    return this.productosRepository.findBy({ idCategoria });
  }

  async findAllByProveedor(idProveedor: number): Promise<Producto[]> {
    return this.productosRepository.findBy({ idProveedor });
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const productos = await this.findOne(id);
    const productoUpdate = Object.assign(productos, updateProductoDto);
    return this.productosRepository.save(productoUpdate);
  }

  async remove(id: number) {
    const productos = await this.findOne(id);
    if (productos) return this.productosRepository.softRemove(productos);
  }
}
