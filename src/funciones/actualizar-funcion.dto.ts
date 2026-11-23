import { PartialType } from '@nestjs/swagger';
import { CrearFuncionDto } from './crear-funcion.dto';

export class ActualizarFuncionDto extends PartialType(CrearFuncionDto) {}