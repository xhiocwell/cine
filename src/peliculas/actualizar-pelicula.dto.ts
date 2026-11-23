import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsIn, IsOptional, Min } from 'class-validator';

export class ActualizarPeliculaDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sinopsis?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  duracionMin?: number;

  @ApiProperty({ required: false, enum: ['ATP', '+13', '+18'] })
  @IsOptional()
  @IsIn(['ATP', '+13', '+18'])
  clasificacion?: string;
}