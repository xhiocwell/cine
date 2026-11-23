import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genero } from './genero.entity';
import { CrearGeneroDto } from './crear-genero.dto';
import { ActualizarGeneroDto } from './actualizar-genero.dto';

@Injectable()
export class GenerosService {
  constructor(
    @InjectRepository(Genero)
    private readonly repositorioGenero: Repository<Genero>,
  ) {}

  async listarTodos(): Promise<Genero[]> {
    return this.repositorioGenero.find();
  }

  async buscarPorId(id: number): Promise<Genero> {
    const genero = await this.repositorioGenero.findOne({
      where: { idGenero: id },
      relations: ['peliculas'],
    });
    if (!genero) {
      throw new NotFoundException(`El género con id ${id} no existe`);
    }
    return genero;
  }

  async crear(dto: CrearGeneroDto): Promise<Genero> {
    const genero = this.repositorioGenero.create(dto);
    return this.repositorioGenero.save(genero);
  }

  async actualizar(id: number, dto: ActualizarGeneroDto): Promise<Genero> {
    const genero = await this.buscarPorId(id);
    Object.assign(genero, dto);
    return this.repositorioGenero.save(genero);
  }

  async eliminar(id: number): Promise<{ mensaje: string }> {
    const genero = await this.buscarPorId(id);
    await this.repositorioGenero.softDelete(genero.idGenero);
    return { mensaje: `El género con id ${id} fue eliminado correctamente` };
  }
}