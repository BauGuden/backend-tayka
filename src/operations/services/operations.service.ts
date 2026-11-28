import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { RegistroAuditoria } from '../entities';

export interface AccionAuditada {
  usuarioActorId: string;
  accion: string;
  tipoEntidad: string;
  entidadId: string;
}

@Injectable()
export class OperationsService {
  /** Insert using the same transaction manager as the action being audited. */
  async registrarAuditoria(
    manager: EntityManager,
    accion: AccionAuditada,
  ): Promise<void> {
    if (!manager.queryRunner?.isTransactionActive) {
      throw new Error('La auditor?a requiere una transacci?n activa');
    }
    await manager
      .createQueryBuilder()
      .insert()
      .into<AccionAuditada>(RegistroAuditoria)
      .values({
        usuarioActorId: accion.usuarioActorId,
        accion: accion.accion,
        tipoEntidad: accion.tipoEntidad,
        entidadId: accion.entidadId,
      })
      .execute();
  }
}
