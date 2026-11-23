import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsIn, IsOptional, IsArray, Min } from 'class-validator';

export class CrearPeliculaDto {
  @ApiProperty({ example: 'Inception' })
  @IsString()
  titulo: string;

  @ApiProperty({ example: 'Un ladrón que roba secretos...' })
  @IsString()
  sinopsis: string;

  @ApiProperty({ example: 148 })
  @IsInt({ message: 'La duración debe ser un entero' })
  @Min(1)
  duracionMin: number;

  @ApiProperty({ enum: ['ATP', '+13', '+18'] })
  @IsIn(['ATP', '+13', '+18'], { message: 'La clasificación debe ser ATP, +13 o +18' })
  clasificacion: string;

  @ApiProperty({ required: false, type: [Number], example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true, message: 'Cada id de género debe ser entero' })
  idGeneros?: number[];
}