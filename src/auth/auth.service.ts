import {
  Injectable, BadRequestException, UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from './usuario.entity';
import { RegistroDto } from './registro.dto';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repositorioUsuario: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async registrar(dto: RegistroDto): Promise<Usuario> {
    const existente = await this.repositorioUsuario.findOne({
      where: { email: dto.email },
    });
    if (existente) {
      throw new BadRequestException('El email ya está registrado');
    }

    const passwordEncriptada = await bcrypt.hash(dto.password, 10);
    const usuario = this.repositorioUsuario.create({
      ...dto,
      password: passwordEncriptada,
    });
    const guardado = await this.repositorioUsuario.save(usuario);
    delete guardado.password;
    return guardado;
  }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const usuario = await this.repositorioUsuario.findOne({
      where: { email: dto.email },
    });
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const coincide = await bcrypt.compare(dto.password, usuario.password);
    if (!coincide) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: usuario.idUsuario, email: usuario.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}