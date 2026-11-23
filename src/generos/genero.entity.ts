import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, DeleteDateColumn, ManyToMany,
} from 'typeorm';
import { Pelicula } from '../peliculas/pelicula.entity';

@Entity('genero')
export class Genero {
  @PrimaryGeneratedColumn()
  idGenero: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToMany(() => Pelicula, (pelicula) => pelicula.generos)
  peliculas: Pelicula[];
}