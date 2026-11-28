import { Injectable } from '@nestjs/common';
import { IsNull } from 'typeorm';
import { Consentimiento, Direccion, Usuario } from '../entities';
import {
  PageQuery,
  ReadModelService,
} from '../../geography/services/read-model.service';

@Injectable()
export class IdentityService {
  constructor(private readonly reads: ReadModelService) {}
  perfil(usuarioId: string) {
    return this.reads.detail(
      Usuario,
      [
        'id',
        'correoElectronico',
        'telefono',
        'nombres',
        'apellidos',
        'urlAvatar',
        'fechaNacimiento',
      ],
      { id: usuarioId, estado: 'activo', eliminadoEn: IsNull() },
    );
  }

  direcciones(usuarioId: string, page: PageQuery) {
    return this.reads.list(
      Direccion,
      [
        'id',
        'ciudadId',
        'etiqueta',
        'direccion',
        'detalleDireccion',
        'referenciasUbicacion',
        'latitud',
        'longitud',
        'esPrincipal',
      ],
      page,
      { usuarioId, usuario: { estado: 'activo', eliminadoEn: IsNull() } },
    );
  }

  consentimientos(usuarioId: string, page: PageQuery) {
    return this.reads.list(
      Consentimiento,
      ['id', 'tipoPolitica', 'versionPolitica', 'otorgado', 'registradoEn'],
      page,
      { usuarioId, usuario: { estado: 'activo', eliminadoEn: IsNull() } },
      { registradoEn: 'ASC', id: 'ASC' },
    );
  }
}
