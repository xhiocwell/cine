import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { Sala } from '../salas/sala.entity';
import { Pelicula } from '../peliculas/pelicula.entity';
import { Boleto } from '../boletos/boleto.entity';

@Entity('funcion')
export class Funcion {
  @PrimaryGeneratedColumn()
  idFuncion: number;

  @Column()
  idSala: number;

  @Column()
  idPelicula: number;

  @Column('datetime')
  fechaHora: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToOne(() => Sala, (sala) => sala.funciones)
  @JoinColumn({ name: 'idSala' })
  sala: Sala;

  @ManyToOne(() => Pelicula, (pelicula) => pelicula.funciones)
  @JoinColumn({ name: 'idPelicula' })
  pelicula: Pelicula;

  @OneToMany(() => Boleto, (boleto) => boleto.funcion)
  boletos: Boleto[];
}