import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CrearClienteDto } from './crear-cliente.dto';
import { ActualizarClienteDto } from './actualizar-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly repositorioCliente: Repository<Cliente>,
  ) {}

  async listarTodos(): Promise<Cliente[]> {
    return this.repositorioCliente.find();
  }

  async buscarPorId(id: number): Promise<Cliente> {
    const cliente = await this.repositorioCliente.findOne({
      where: { idCliente: id },
      relations: ['boletos', 'boletos.funcion'],
    });
    if (!cliente) {
      throw new NotFoundException(`El cliente con id ${id} no existe`);
    }
    return cliente;
  }

  async crear(dto: CrearClienteDto): Promise<Cliente> {
    const cliente = this.repositorioCliente.create(dto);
    return this.repositorioCliente.save(cliente);
  }

  async actualizar(id: number, dto: ActualizarClienteDto): Promise<Cliente> {
    const cliente = await this.buscarPorId(id);
    Object.assign(cliente, dto);
    return this.repositorioCliente.save(cliente);
  }

  async eliminar(id: number): Promise<{ mensaje: string }> {
    const cliente = await this.buscarPorId(id);
    await this.repositorioCliente.softDelete(cliente.idCliente);
    return { mensaje: `El cliente con id ${id} fue eliminado correctamente` };
  }
}