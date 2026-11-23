import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, DeleteDateColumn, OneToMany,
} from 'typeorm';
import { Funcion } from '../funciones/funcion.entity';

@Entity('sala')
export class Sala {
  @PrimaryGeneratedColumn()
  idSala: number;

  @Column()
  nombre: string;

  @Column('int')
  capacidad: number;

  @Column()
  tipo: string; // 2D, 3D, IMAX

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @OneToMany(() => Funcion, (funcion) => funcion.sala)
  funciones: Funcion[];
}