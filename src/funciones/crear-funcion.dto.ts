import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, IsNumber, Min } from 'class-validator';

export class CrearFuncionDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  idSala: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  idPelicula: number;

  @ApiProperty({ example: '2024-12-25T20:00:00.000Z' })
  @IsDateString({}, { message: 'fechaHora debe ser una fecha válida ISO 8601' })
  fechaHora: string;

  @ApiProperty({ example: 25.5 })
  @IsNumber({}, { message: 'El precio debe ser numérico' })
  @Min(0)
  precio: number;
}