import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { GrupoCompra } from './grupos-compra.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'commerce', name: 'eventos_grupo', synchronize: false })
export class EventoGrupo {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'grupo_id', type: 'uuid' })
  grupoId!: string;

  @Column({ name: 'usuario_actor_id', type: 'uuid', nullable: true })
  usuarioActorId!: string | null;

  @Column({ name: 'tipo_evento', type: 'varchar', length: 70 })
  tipoEvento!: string;

  @Column({
    name: 'estado_anterior',
    type: 'varchar',
    length: 26,
    nullable: true,
  })
  estadoAnterior!: string | null;

  @Column({ name: 'estado_nuevo', type: 'varchar', length: 26, nullable: true })
  estadoNuevo!: string | null;

  @Column({ name: 'datos_evento', type: 'jsonb', default: () => "'{}'::jsonb" })
  datosEvento!: JsonValue;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @ManyToOne(() => GrupoCompra, { nullable: false })
  @JoinColumn({ name: 'grupo_id', referencedColumnName: 'id' })
  grupo!: Relation<GrupoCompra>;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'usuario_actor_id', referencedColumnName: 'id' })
  usuarioActor!: Relation<Usuario> | null;
}
