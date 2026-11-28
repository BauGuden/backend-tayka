import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Usuario } from '../../identity/entities/usuarios.entity';

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({
  schema: 'operations',
  name: 'registros_auditoria',
  synchronize: false,
})
export class RegistroAuditoria {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'usuario_actor_id', type: 'uuid', nullable: true })
  usuarioActorId!: string | null;

  @Column({ name: 'accion', type: 'varchar', length: 100 })
  accion!: string;

  @Column({ name: 'tipo_entidad', type: 'varchar', length: 80 })
  tipoEntidad!: string;

  @Column({ name: 'entidad_id', type: 'uuid', nullable: true })
  entidadId!: string | null;

  @Column({ name: 'datos_anteriores', type: 'jsonb', nullable: true })
  datosAnteriores!: JsonValue | null;

  @Column({ name: 'datos_posteriores', type: 'jsonb', nullable: true })
  datosPosteriores!: JsonValue | null;

  @Column({
    name: 'solicitud_id',
    type: 'varchar',
    length: 140,
    nullable: true,
  })
  solicitudId!: string | null;

  @Column({ name: 'direccion_ip', type: 'inet', nullable: true })
  direccionIp!: string | null;

  @Column({ name: 'ocurrido_en', type: 'timestamptz', default: () => 'now()' })
  ocurridoEn!: Date;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'usuario_actor_id', referencedColumnName: 'id' })
  usuarioActor!: Relation<Usuario> | null;
}
