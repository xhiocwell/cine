import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsIn, Min } from 'class-validator';

export class CrearSalaDto {
  @ApiProperty({ example: 'Sala 1' })
  @IsString({ message: 'El nombre debe ser texto' })
  nombre: string;

  @ApiProperty({ example: 50 })
  @IsInt({ message: 'La capacidad debe ser un entero' })
  @Min(1, { message: 'La capacidad debe ser mayor a 0' })
  capacidad: number;

  @ApiProperty({ enum: ['2D', '3D', 'IMAX'] })
  @IsIn(['2D', '3D', 'IMAX'], { message: 'El tipo debe ser 2D, 3D o IMAX' })
  tipo: string;
}