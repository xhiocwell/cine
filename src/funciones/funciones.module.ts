import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcion } from './funcion.entity';
import { Sala } from '../salas/sala.entity';
import { Pelicula } from '../peliculas/pelicula.entity';
import { FuncionesService } from './funciones.service';
import { FuncionesController } from './funciones.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Funcion, Sala, Pelicula]), AuthModule],
  controllers: [FuncionesController],
  providers: [FuncionesService],
  exports: [FuncionesService],
})
export class FuncionesModule {}