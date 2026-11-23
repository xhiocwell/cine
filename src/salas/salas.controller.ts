import {
  Controller, Get, Post, Patch, Delete, Body, Param,
  ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SalasService } from './salas.service';
import { CrearSalaDto } from './crear-sala.dto';
import { ActualizarSalaDto } from './actualizar-sala.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Salas')
@Controller('salas')
export class SalasController {
  constructor(private readonly salasService: SalasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las salas' })
  @ApiResponse({ status: 200, description: 'Lista de salas' })
  listarTodas() {
    return this.salasService.listarTodas();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una sala por id (incluye sus funciones)' })
  @ApiResponse({ status: 200, description: 'Sala encontrada' })
  @ApiResponse({ status: 404, description: 'Sala no encontrada' })
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.salasService.buscarPorId(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una sala' })
  @ApiResponse({ status: 201, description: 'Sala creada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  crear(@Body() dto: CrearSalaDto) {
    return this.salasService.crear(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una sala' })
  @ApiResponse({ status: 200, description: 'Sala actualizada' })
  @ApiResponse({ status: 404, description: 'Sala no encontrada' })
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarSalaDto,
  ) {
    return this.salasService.actualizar(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una sala (borrado lógico)' })
  @ApiResponse({ status: 200, description: 'Sala eliminada' })
  @ApiResponse({ status: 404, description: 'Sala no encontrada' })
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.salasService.eliminar(id);
  }
}