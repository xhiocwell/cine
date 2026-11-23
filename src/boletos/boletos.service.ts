import {
  Injectable, NotFoundException, BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Boleto } from './boleto.entity';
import { Funcion } from '../funciones/funcion.entity';
import { Cliente } from '../clientes/cliente.entity';
import { CrearBoletoDto } from './crear-boleto.dto';
import { ActualizarBoletoDto } from './actualizar-boleto.dto';

@Injectable()
export class BoletosService {
  constructor(
    @InjectRepository(Boleto)
    private readonly repositorioBoleto: Repository<Boleto>,
    @InjectRepository(Funcion)
    private readonly repositorioFuncion: Repository<Funcion>,
    @InjectRepository(Cliente)
    private readonly repositorioCliente: Repository<Cliente>,
  ) {}

  async listarTodos(): Promise<Boleto[]> {
    return this.repositorioBoleto.find({ relations: ['funcion', 'cliente'] });
  }

  async buscarPorId(id: number): Promise<Boleto> {
    const boleto = await this.repositorioBoleto.findOne({
      where: { idBoleto: id },
      relations: ['funcion', 'cliente'],
    });
    if (!boleto) {
      throw new NotFoundException(`El boleto con id ${id} no existe`);
    }
    return boleto;
  }

  async crear(dto: CrearBoletoDto): Promise<Boleto> {
    const funcion = await this.repositorioFuncion.findOne({
      where: { idFuncion: dto.idFuncion },
      relations: ['sala'],
    });
    if (!funcion) {
      throw new NotFoundException(`La función con id ${dto.idFuncion} no existe`);
    }

    const cliente = await this.repositorioCliente.findOne({
      where: { idCliente: dto.idCliente },
    });
    if (!cliente) {
      throw new NotFoundException(`El cliente con id ${dto.idCliente} no existe`);
    }

    // Regla: asiento dentro del rango de la sala
    if (dto.numeroAsiento < 1 || dto.numeroAsiento > funcion.sala.capacidad) {
      throw new BadRequestException(
        `El número de asiento debe estar entre 1 y ${funcion.sala.capacidad}`,
      );
    }

    // Regla: no vender el mismo asiento dos veces para la misma función
    const asientoOcupado = await this.repositorioBoleto.findOne({
      where: {
        idFuncion: dto.idFuncion,
        numeroAsiento: dto.numeroAsiento,
      },
    });
    if (asientoOcupado) {
      throw new BadRequestException(
        `El asiento ${dto.numeroAsiento} ya está ocupado para esta función`,
      );
    }

    // Regla: si no se envía precioPagado, usar precio de la función
    const precioPagado = dto.precioPagado ?? funcion.precio;

    const boleto = this.repositorioBoleto.create({
      idFuncion: dto.idFuncion,
      idCliente: dto.idCliente,
      numeroAsiento: dto.numeroAsiento,
      precioPagado,
      funcion,
      cliente,
    });
    return this.repositorioBoleto.save(boleto);
  }

  async actualizar(id: number, dto: ActualizarBoletoDto): Promise<Boleto> {
    const boleto = await this.repositorioBoleto.findOne({
      where: { idBoleto: id },
      relations: ['funcion', 'funcion.sala', 'cliente'],
    });
    if (!boleto) {
      throw new NotFoundException(`El boleto con id ${id} no existe`);
    }

    let funcionActual = boleto.funcion;

    if (dto.idFuncion !== undefined) {
      const funcion = await this.repositorioFuncion.findOne({
        where: { idFuncion: dto.idFuncion },
        relations: ['sala'],
      });
      if (!funcion) {
        throw new NotFoundException(`La función con id ${dto.idFuncion} no existe`);
      }
      funcionActual = funcion;
      boleto.funcion = funcion;
      boleto.idFuncion = funcion.idFuncion;
    }

    if (dto.idCliente !== undefined) {
      const cliente = await this.repositorioCliente.findOne({
        where: { idCliente: dto.idCliente },
      });
      if (!cliente) {
        throw new NotFoundException(`El cliente con id ${dto.idCliente} no existe`);
      }
      boleto.cliente = cliente;
      boleto.idCliente = cliente.idCliente;
    }

    if (dto.numeroAsiento !== undefined) {
      // Validar rango contra la capacidad de la sala de la función actual
      if (
        dto.numeroAsiento < 1 ||
        dto.numeroAsiento > funcionActual.sala.capacidad
      ) {
        throw new BadRequestException(
          `El número de asiento debe estar entre 1 y ${funcionActual.sala.capacidad}`,
        );
      }

      // Validar que no esté ocupado por otro boleto (excluyendo este mismo)
      const asientoOcupado = await this.repositorioBoleto.findOne({
        where: {
          idFuncion: funcionActual.idFuncion,
          numeroAsiento: dto.numeroAsiento,
          idBoleto: Not(id),
        },
      });
      if (asientoOcupado) {
        throw new BadRequestException(
          `El asiento ${dto.numeroAsiento} ya está ocupado para esta función`,
        );
      }
      boleto.numeroAsiento = dto.numeroAsiento;
    }

    if (dto.precioPagado !== undefined) {
      boleto.precioPagado = dto.precioPagado;
    }

    return this.repositorioBoleto.save(boleto);
  }

  async eliminar(id: number): Promise<{ mensaje: string }> {
    const boleto = await this.buscarPorId(id);
    await this.repositorioBoleto.softDelete(boleto.idBoleto);
    return { mensaje: `El boleto con id ${id} fue anulado correctamente` };
  }
}