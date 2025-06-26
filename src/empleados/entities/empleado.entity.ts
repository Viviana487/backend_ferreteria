import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('empleados')
export class Empleado {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 30 })
  ci: string;

  @Column('varchar', { length: 50 })
  nombre: string;

  @Column('varchar', { length: 50, name: 'apellido_paterno', nullable: true })
  apellidoPaterno: string;

  @Column('varchar', { length: 50, name: 'apellido_materno', nullable: true })
  apellidoMaterno: string;

  @Column('varchar', { length: 60 })
  direccion: string;

  @Column('varchar', { length: 20 })
  celular: string;

  @Column('varchar', { length: 50 })
  cargo: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @OneToOne(() => Usuario, (usuario) => usuario.empleado)
  usuario: Usuario;
}
