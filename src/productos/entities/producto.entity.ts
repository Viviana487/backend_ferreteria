import { VentaDetalle } from 'src/ventas_detalles/entities/venta_detalle.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_categoria' })
  idCategoria: number;

  @Column('integer', { name: 'id_proveedor' })
  idProveedor: number;

  @Column('varchar')
  codigo: string;

  @Column('varchar')
  descripcion: string;

  @Column('decimal', { name: 'precio_venta' })
  precioVenta: number;

  @Column('integer')
  saldo: number;

  @Column('varchar', { name: 'unidad_medida' })
  unidadMedida: string;

  @Column('varchar', { nullable: true })
  fotografia: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @OneToMany(() => VentaDetalle, (ventaDetalle) => ventaDetalle.producto)
  ventasDetalles: VentaDetalle[];

  @ManyToOne(() => Categoria, (categoria) => categoria.producto)
  @JoinColumn({ name: 'id_categoria', referencedColumnName: 'id' })
  categoria: Categoria;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.producto)
  @JoinColumn({ name: 'id_proveedor', referencedColumnName: 'id' })
  proveedor: Proveedor;
}
