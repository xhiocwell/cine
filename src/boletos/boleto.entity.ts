import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { Funcion } from '../funciones/funcion.entity';
import { Cliente } from '../clientes/cliente.entity';

@Entity('boleto')
export class Boleto {
  @PrimaryGeneratedColumn()
  idBoleto: number;

  @Column()
  idFuncion: number;

  @Column()
  idCliente: number;

  @Column('int')
  numeroAsiento: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precioPagado: number;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToOne(() => Funcion, (funcion) => funcion.boletos)
  @JoinColumn({ name: 'idFuncion' })
  funcion: Funcion;

  @ManyToOne(() => Cliente, (cliente) => cliente.boletos)
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente;
}