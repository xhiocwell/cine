import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CrearBoletoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  idFuncion: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  idCliente: number;

  @ApiProperty({ example: 5 })
  @IsInt({ message: 'El número de asiento debe ser entero' })
  @Min(1, { message: 'El número de asiento debe ser mayor a 0' })
  numeroAsiento: number;

  @ApiProperty({ example: 25.5, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El precio pagado debe ser numérico' })
  @Min(0)
  precioPagado?: number;
}