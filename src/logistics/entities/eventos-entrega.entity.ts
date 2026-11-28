import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Entrega } from './entregas.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'logistics', name: 'eventos_entrega', synchronize: false })
export class EventoEntrega {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'entrega_id', type: 'uuid' })
  entregaId!: string;

  @Column({ name: 'estado', type: 'varchar', length: 24 })
  estado!: string;

  @Column({ name: 'usuario_actor_id', type: 'uuid', nullable: true })
  usuarioActorId!: string | null;

  @Column({ name: 'ubicacion', type: 'varchar', length: 250, nullable: true })
  ubicacion!: string | null;

  @Column({ name: 'detalles', type: 'jsonb', default: () => "'{}'::jsonb" })
  detalles!: JsonValue;

  @Column({ name: 'ocurrido_en', type: 'timestamptz', default: () => 'now()' })
  ocurridoEn!: Date;

  @ManyToOne(() => Entrega, { nullable: false })
  @JoinColumn({ name: 'entrega_id', referencedColumnName: 'id' })
  entrega!: Relation<Entrega>;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'usuario_actor_id', referencedColumnName: 'id' })
  usuarioActor!: Relation<Usuario> | null;
}
