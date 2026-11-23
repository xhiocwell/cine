import { PartialType } from '@nestjs/swagger';
import { CrearSalaDto } from './crear-sala.dto';

export class ActualizarSalaDto extends PartialType(CrearSalaDto) {}