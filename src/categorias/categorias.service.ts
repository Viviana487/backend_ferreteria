import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
  ) {}

  async create(CreateCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const existe = await this.categoriasRepository.findOneBy({
      nombre: CreateCategoriaDto.nombre.trim(),
      descripcion: CreateCategoriaDto.descripcion.trim(),
    });

    if (existe) throw new ConflictException('La categoria ya existe');

    const categoria = new Categoria();
    categoria.nombre = CreateCategoriaDto.nombre.trim();
    categoria.descripcion = CreateCategoriaDto.descripcion.trim();
    return this.categoriasRepository.save(categoria);
  }

  async findAll() {
    return this.categoriasRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findOneBy({ id });
    if (!categoria) throw new NotFoundException('La categoria no existe');
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);
    const categoriaUpdate = Object.assign(categoria, updateCategoriaDto);
    return this.categoriasRepository.save(categoriaUpdate);
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    if (categoria) return this.categoriasRepository.softRemove(categoria);
  }
}
