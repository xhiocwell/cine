import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class CrearClienteDto {
  @ApiProperty({ example: 'Juan' })
  @IsString()
  nombres: string;

  @ApiProperty({ example: 'Pérez' })
  @IsString()
  paterno: string;

  @ApiProperty({ example: 'Gómez' })
  @IsString()
  materno: string;

  @ApiProperty({ example: 'juan@correo.com' })
  @IsEmail({}, { message: 'El email no es válido' })
  email: string;
}