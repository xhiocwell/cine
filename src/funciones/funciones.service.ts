import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcion } from './funcion.entity';
import { Sala } from '../salas/sala.entity';
import { Pelicula } from '../peliculas/pelicula.entity';
import { CrearFuncionDto } from './crear-funcion.dto';
import { ActualizarFuncionDto } from './actualizar-funcion.dto';

@Injectable()
export class FuncionesService {
  constructor(
    @InjectRepository(Funcion)
    private readonly repositorioFuncion: Repository<Funcion>,
    @InjectRepository(Sala)
    private readonly repositorioSala: Repository<Sala>,
    @InjectRepository(Pelicula)
    private readonly repositorioPelicula: Repository<Pelicula>,
  ) {}

  async listarTodas(): Promise<Funcion[]> {
    return this.repositorioFuncion.find({ relations: ['sala', 'pelicula'] });
  }

  async buscarPorId(id: number): Promise<Funcion> {
    const funcion = await this.repositorioFuncion.findOne({
      where: { idFuncion: id },
      relations: ['sala', 'pelicula', 'boletos'],
    });
    if (!funcion) {
      throw new NotFoundException(`La función con id ${id} no existe`);
    }
    return funcion;
  }

  async crear(dto: CrearFuncionDto): Promise<Funcion> {
    const sala = await this.repositorioSala.findOne({
      where: { idSala: dto.idSala },
    });
    if (!sala) {
      throw new NotFoundException(`La sala con id ${dto.idSala} no existe`);
    }

    const pelicula = await this.repositorioPelicula.findOne({
      where: { idPelicula: dto.idPelicula },
    });
    if (!pelicula) {
      throw new NotFoundException(`La película con id ${dto.idPelicula} no existe`);
    }

    const funcion = this.repositorioFuncion.create({
      ...dto,
      fechaHora: new Date(dto.fechaHora),
      sala,
      pelicula,
    });
    return this.repositorioFuncion.save(funcion);
  }

  async actualizar(id: number, dto: ActualizarFuncionDto): Promise<Funcion> {
    const funcion = await this.buscarPorId(id);

    if (dto.idSala !== undefined) {
      const sala = await this.repositorioSala.findOne({
        where: { idSala: dto.idSala },
      });
      if (!sala) {
        throw new NotFoundException(`La sala con id ${dto.idSala} no existe`);
      }
      funcion.sala = sala;
      funcion.idSala = sala.idSala;
    }

    if (dto.idPelicula !== undefined) {
      const pelicula = await this.repositorioPelicula.findOne({
        where: { idPelicula: dto.idPelicula },
      });
      if (!pelicula) {
        throw new NotFoundException(`La película con id ${dto.idPelicula} no existe`);
      }
      funcion.pelicula = pelicula;
      funcion.idPelicula = pelicula.idPelicula;
    }

    if (dto.fechaHora) funcion.fechaHora = new Date(dto.fechaHora);
    if (dto.precio !== undefined) funcion.precio = dto.precio;

    return this.repositorioFuncion.save(funcion);
  }

  async eliminar(id: number): Promise<{ mensaje: string }> {
    const funcion = await this.buscarPorId(id);
    await this.repositorioFuncion.softDelete(funcion.idFuncion);
    return { mensaje: `La función con id ${id} fue eliminada correctamente` };
  }
}