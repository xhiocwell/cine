import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pelicula } from './pelicula.entity';
import { Genero } from '../generos/genero.entity';
import { PeliculasService } from './peliculas.service';
import { PeliculasController } from './peliculas.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pelicula, Genero]), AuthModule],
  controllers: [PeliculasController],
  providers: [PeliculasService],
  exports: [PeliculasService],
})
export class PeliculasModule {}