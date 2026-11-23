import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CrearGeneroDto {
  @ApiProperty({ example: 'Acción' })
  @IsString({ message: 'El nombre debe ser texto' })
  @MaxLength(50)
  nombre: string;

  @ApiProperty({ example: 'Películas con mucha acción' })
  @IsString({ message: 'La descripción debe ser texto' })
  descripcion: string;
}