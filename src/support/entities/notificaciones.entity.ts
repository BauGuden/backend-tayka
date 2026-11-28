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
 * canal: CHECK(canal IN ('interna','correo','sms','push'))
 * estado: CHECK(estado IN ('en_cola','enviado','fallido','leido'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'support', name: 'notificaciones', synchronize: false })
export class Notificacion {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'usuario_id', type: 'uuid' })
  usuarioId!: string;

  @Column({ name: 'canal', type: 'varchar', length: 14 })
  canal!: string;

  @Column({ name: 'titulo', type: 'varchar', length: 200 })
  titulo!: string;

  @Column({ name: 'contenido', type: 'text', nullable: true })
  contenido!: string | null;

  @Column({ name: 'datos', type: 'jsonb', default: () => "'{}'::jsonb" })
  datos!: JsonValue;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 14,
    default: () => "'en_cola'",
  })
  estado!: string;

  @Column({ name: 'leido_en', type: 'timestamptz', nullable: true })
  leidoEn!: Date | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @Column({ name: 'enviado_en', type: 'timestamptz', nullable: true })
  enviadoEn!: Date | null;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  usuario!: Relation<Usuario>;
}
