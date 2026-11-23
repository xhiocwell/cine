import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boleto } from './boleto.entity';
import { Funcion } from '../funciones/funcion.entity';
import { Cliente } from '../clientes/cliente.entity';
import { BoletosService } from './boletos.service';
import { BoletosController } from './boletos.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Boleto, Funcion, Cliente]), AuthModule],
  controllers: [BoletosController],
  providers: [BoletosService],
  exports: [BoletosService],
})
export class BoletosModule {}