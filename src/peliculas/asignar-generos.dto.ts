import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, ArrayNotEmpty } from 'class-validator';

export class AsignarGenerosDto {
  @ApiProperty({ type: [Number], example: [1, 2] })
  @IsArray()
  @ArrayNotEmpty({ message: 'Debe enviar al menos un género' })
  @IsInt({ each: true })
  idGeneros: number[];
}