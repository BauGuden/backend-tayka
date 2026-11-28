import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Usuario } from '../../identity/entities/usuarios.entity';
import { Ciudad } from '../../geography/entities/ciudades.entity';

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'logistics', name: 'puntos_retiro', synchronize: false })
export class PuntoRetiro {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'usuario_operador_id', type: 'uuid', nullable: true })
  usuarioOperadorId!: string | null;

  @Column({ name: 'ciudad_id', type: 'uuid' })
  ciudadId!: string;

  @Column({ name: 'nombre', type: 'varchar', length: 160 })
  nombre!: string;

  @Column({ name: 'direccion', type: 'varchar', length: 300 })
  direccion!: string;

  @Column({
    name: 'latitud',
    type: 'numeric',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  latitud!: string | null;

  @Column({
    name: 'longitud',
    type: 'numeric',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  longitud!: string | null;

  @Column({ name: 'horario', type: 'jsonb', default: () => "'{}'::jsonb" })
  horario!: JsonValue;

  @Column({ name: 'esta_activo', type: 'boolean', default: () => 'true' })
  estaActivo!: boolean;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'usuario_operador_id', referencedColumnName: 'id' })
  usuarioOperador!: Relation<Usuario> | null;

  @ManyToOne(() => Ciudad, { nullable: false })
  @JoinColumn({ name: 'ciudad_id', referencedColumnName: 'id' })
  ciudad!: Relation<Ciudad>;
}
