import { Producto } from 'src/productos/entities/producto.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { name: 'razon_social' })
  razonSocial: string;

  @Column('varchar', { length: 12, name: 'ci_nit' })
  ciNit: string;

  @Column('varchar',{ nullable: true })
  telefono: string;

  @Column('varchar')
  direccion: string;

  @Column('varchar')
  representante: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @OneToMany(() => Producto, (producto) => producto.proveedor)
  producto: Producto[];
}
