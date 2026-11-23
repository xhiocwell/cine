import {
  Controller, Get, Post, Patch, Delete, Body, Param,
  ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FuncionesService } from './funciones.service';
import { CrearFuncionDto } from './crear-funcion.dto';
import { ActualizarFuncionDto } from './actualizar-funcion.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Funciones')
@Controller('funciones')
export class FuncionesController {
  constructor(private readonly funcionesService: FuncionesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las funciones (incluye sala y película)' })
  listarTodas() {
    return this.funcionesService.listarTodas();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una función por id (sala, película y boletos)' })
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.funcionesService.buscarPorId(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una función (requiere idSala e idPelicula)' })
  @ApiResponse({ status: 404, description: 'Sala o película no encontrada' })
  crear(@Body() dto: CrearFuncionDto) {
    return this.funcionesService.crear(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una función' })
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarFuncionDto,
  ) {
    return this.funcionesService.actualizar(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una función (borrado lógico)' })
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.funcionesService.eliminar(id);
  }
}