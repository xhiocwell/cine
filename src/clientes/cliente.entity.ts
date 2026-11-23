import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, DeleteDateColumn, OneToMany,
} from 'typeorm';
import { Boleto } from '../boletos/boleto.entity';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  idCliente: number;

  @Column()
  nombres: string;

  @Column()
  paterno: string;

  @Column()
  materno: string;

  @Column()
  email: string;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @OneToMany(() => Boleto, (boleto) => boleto.cliente)
  boletos: Boleto[];
}