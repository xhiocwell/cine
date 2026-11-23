import {
  Controller, Get, Post, Patch, Delete, Body, Param,
  ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BoletosService } from './boletos.service';
import { CrearBoletoDto } from './crear-boleto.dto';
import { ActualizarBoletoDto } from './actualizar-boleto.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Boletos')
@Controller('boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los boletos' })
  listarTodos() {
    return this.boletosService.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un boleto por id (incluye función y cliente)' })
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.boletosService.buscarPorId(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Vender un boleto' })
  @ApiResponse({ status: 201, description: 'Boleto vendido' })
  @ApiResponse({ status: 400, description: 'Asiento ocupado o fuera de rango' })
  @ApiResponse({ status: 404, description: 'Función o cliente no encontrado' })
  crear(@Body() dto: CrearBoletoDto) {
    return this.boletosService.crear(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un boleto' })
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarBoletoDto,
  ) {
    return this.boletosService.actualizar(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Anular un boleto (borrado lógico)' })
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.boletosService.eliminar(id);
  }
}