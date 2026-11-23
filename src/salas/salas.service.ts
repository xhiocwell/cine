import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sala } from './sala.entity';
import { CrearSalaDto } from './crear-sala.dto';
import { ActualizarSalaDto } from './actualizar-sala.dto';

@Injectable()
export class SalasService {
  constructor(
    @InjectRepository(Sala)
    private readonly repositorioSala: Repository<Sala>,
  ) {}

  async listarTodas(): Promise<Sala[]> {
    return this.repositorioSala.find();
  }

  async buscarPorId(id: number): Promise<Sala> {
    const sala = await this.repositorioSala.findOne({
      where: { idSala: id },
      relations: ['funciones'],
    });
    if (!sala) {
      throw new NotFoundException(`La sala con id ${id} no existe`);
    }
    return sala;
  }

  async crear(dto: CrearSalaDto): Promise<Sala> {
    const sala = this.repositorioSala.create(dto);
    return this.repositorioSala.save(sala);
  }

  async actualizar(id: number, dto: ActualizarSalaDto): Promise<Sala> {
    const sala = await this.buscarPorId(id);
    Object.assign(sala, dto);
    return this.repositorioSala.save(sala);
  }

  async eliminar(id: number): Promise<{ mensaje: string }> {
    const sala = await this.buscarPorId(id);
    await this.repositorioSala.softDelete(sala.idSala);
    return { mensaje: `La sala con id ${id} fue eliminada correctamente` };
  }
}