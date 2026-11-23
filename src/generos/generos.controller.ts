import {
  Controller, Get, Post, Patch, Delete, Body, Param,
  ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GenerosService } from './generos.service';
import { CrearGeneroDto } from './crear-genero.dto';
import { ActualizarGeneroDto } from './actualizar-genero.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Géneros')
@Controller('generos')
export class GenerosController {
  constructor(private readonly generosService: GenerosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los géneros' })
  @ApiResponse({ status: 200, description: 'Lista de géneros' })
  listarTodos() {
    return this.generosService.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un género por id (incluye sus películas)' })
  @ApiResponse({ status: 200, description: 'Género encontrado' })
  @ApiResponse({ status: 404, description: 'Género no encontrado' })
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.generosService.buscarPorId(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un género' })
  @ApiResponse({ status: 201, description: 'Género creado' })
  crear(@Body() dto: CrearGeneroDto) {
    return this.generosService.crear(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un género' })
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarGeneroDto,
  ) {
    return this.generosService.actualizar(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un género (borrado lógico)' })
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.generosService.eliminar(id);
  }
}