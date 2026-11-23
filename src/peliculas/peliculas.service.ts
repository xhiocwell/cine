import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Pelicula } from './pelicula.entity';
import { Genero } from '../generos/genero.entity';
import { CrearPeliculaDto } from './crear-pelicula.dto';
import { ActualizarPeliculaDto } from './actualizar-pelicula.dto';
import { AsignarGenerosDto } from './asignar-generos.dto';

@Injectable()
export class PeliculasService {
  constructor(
    @InjectRepository(Pelicula)
    private readonly repositorioPelicula: Repository<Pelicula>,
    @InjectRepository(Genero)
    private readonly repositorioGenero: Repository<Genero>,
  ) {}

  async listarTodas(): Promise<Pelicula[]> {
    return this.repositorioPelicula.find({ relations: ['generos'] });
  }

  async buscarPorId(id: number): Promise<Pelicula> {
    const pelicula = await this.repositorioPelicula.findOne({
      where: { idPelicula: id },
      relations: ['generos', 'funciones'],
    });
    if (!pelicula) {
      throw new NotFoundException(`La película con id ${id} no existe`);
    }
    return pelicula;
  }

  async crear(dto: CrearPeliculaDto): Promise<Pelicula> {
    const { idGeneros, ...datosPelicula } = dto;
    const pelicula = this.repositorioPelicula.create(datosPelicula);

    if (idGeneros && idGeneros.length > 0) {
      const generos = await this.repositorioGenero.findBy({ idGenero: In(idGeneros) });
      if (generos.length !== idGeneros.length) {
        throw new NotFoundException('Uno o más géneros enviados no existen');
      }
      pelicula.generos = generos;
    }

    return this.repositorioPelicula.save(pelicula);
  }

  async actualizar(id: number, dto: ActualizarPeliculaDto): Promise<Pelicula> {
    const pelicula = await this.buscarPorId(id);
    Object.assign(pelicula, dto);
    return this.repositorioPelicula.save(pelicula);
  }

  async eliminar(id: number): Promise<{ mensaje: string }> {
    const pelicula = await this.buscarPorId(id);
    await this.repositorioPelicula.softDelete(pelicula.idPelicula);
    return { mensaje: `La película con id ${id} fue eliminada correctamente` };
  }

  async asignarGeneros(id: number, dto: AsignarGenerosDto): Promise<Pelicula> {
    const pelicula = await this.repositorioPelicula.findOne({
      where: { idPelicula: id },
      relations: ['generos'],
    });
    if (!pelicula) {
      throw new NotFoundException(`La película con id ${id} no existe`);
    }

    const generos = await this.repositorioGenero.findBy({ idGenero: In(dto.idGeneros) });
    if (generos.length !== dto.idGeneros.length) {
      throw new NotFoundException('Uno o más géneros enviados no existen');
    }

    const idsYaAsignados = pelicula.generos.map((g) => g.idGenero);
    const nuevos = generos.filter((g) => !idsYaAsignados.includes(g.idGenero));
    pelicula.generos = [...pelicula.generos, ...nuevos];

    return this.repositorioPelicula.save(pelicula);
  }

  async quitarGenero(id: number, idGenero: number): Promise<Pelicula> {
    const pelicula = await this.repositorioPelicula.findOne({
      where: { idPelicula: id },
      relations: ['generos'],
    });
    if (!pelicula) {
      throw new NotFoundException(`La película con id ${id} no existe`);
    }

    const genero = await this.repositorioGenero.findOne({ where: { idGenero } });
    if (!genero) {
      throw new NotFoundException(`El género con id ${idGenero} no existe`);
    }

    pelicula.generos = pelicula.generos.filter((g) => g.idGenero !== idGenero);
    return this.repositorioPelicula.save(pelicula);
  }
}