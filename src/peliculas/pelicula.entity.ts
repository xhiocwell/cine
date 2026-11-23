import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany,
} from 'typeorm';
import { Genero } from '../generos/genero.entity';
import { Funcion } from '../funciones/funcion.entity';

@Entity('pelicula')
export class Pelicula {
  @PrimaryGeneratedColumn()
  idPelicula: number;

  @Column()
  titulo: string;

  @Column('text')
  sinopsis: string;

  @Column('int')
  duracionMin: number;

  @Column()
  clasificacion: string; // ATP, +13, +18

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToMany(() => Genero, (genero) => genero.peliculas, { cascade: true })
  @JoinTable({
    name: 'pelicula_genero',
    joinColumn: { name: 'idPelicula', referencedColumnName: 'idPelicula' },
    inverseJoinColumn: { name: 'idGenero', referencedColumnName: 'idGenero' },
  })
  generos: Genero[];

  @OneToMany(() => Funcion, (funcion) => funcion.pelicula)
  funciones: Funcion[];
}