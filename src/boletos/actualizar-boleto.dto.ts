import { PartialType } from '@nestjs/swagger';
import { CrearBoletoDto } from './crear-boleto.dto';

export class ActualizarBoletoDto extends PartialType(CrearBoletoDto) {}