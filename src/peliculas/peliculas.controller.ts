import {
  Controller, Get, Post, Patch, Delete, Body, Param,
  ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PeliculasService } from './peliculas.service';
import { CrearPeliculaDto } from './crear-pelicula.dto';
import { ActualizarPeliculaDto } from './actualizar-pelicula.dto';
import { AsignarGenerosDto } from './asignar-generos.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Películas')
@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly peliculasService: PeliculasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las películas (incluye géneros)' })
  listarTodas() {
    return this.peliculasService.listarTodas();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una película por id (incluye géneros y funciones)' })
  @ApiResponse({ status: 404, description: 'Película no encontrada' })
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.peliculasService.buscarPorId(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una película (opcionalmente con géneros)' })
  @ApiResponse({ status: 201, description: 'Película creada' })
  crear(@Body() dto: CrearPeliculaDto) {
    return this.peliculasService.crear(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar datos de una película' })
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarPeliculaDto,
  ) {
    return this.peliculasService.actualizar(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una película (borrado lógico)' })
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.peliculasService.eliminar(id);
  }

  @Post(':id/generos')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Asignar uno o más géneros a una película' })
  @ApiResponse({ status: 404, description: 'Película o género no encontrado' })
  asignarGeneros(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AsignarGenerosDto,
  ) {
    return this.peliculasService.asignarGeneros(id, dto);
  }

  @Delete(':id/generos/:idGenero')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Quitar un género de una película' })
  quitarGenero(
    @Param('id', ParseIntPipe) id: number,
    @Param('idGenero', ParseIntPipe) idGenero: number,
  ) {
    return this.peliculasService.quitarGenero(id, idGenero);
  }
}