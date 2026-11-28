import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Usuario } from './usuarios.entity';
import { Ciudad } from '../../geography/entities/ciudades.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * CHECK (latitud IS NULL OR latitud BETWEEN -90 AND 90)
 * CHECK (longitud IS NULL OR longitud BETWEEN -180 AND 180)
 * CREATE UNIQUE INDEX unica_direccion_principal_usuario ON identity.direcciones(usuario_id) WHERE es_principal;
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'identity', name: 'direcciones', synchronize: false })
export class Direccion {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'usuario_id', type: 'uuid' })
  usuarioId!: string;

  @Column({ name: 'ciudad_id', type: 'uuid', nullable: true })
  ciudadId!: string | null;

  @Column({
    name: 'etiqueta',
    type: 'varchar',
    length: 70,
    default: () => "'Principal'",
  })
  etiqueta!: string;

  @Column({ name: 'direccion', type: 'varchar', length: 240 })
  direccion!: string;

  @Column({
    name: 'detalle_direccion',
    type: 'varchar',
    length: 240,
    nullable: true,
  })
  detalleDireccion!: string | null;

  @Column({
    name: 'referencias_ubicacion',
    type: 'varchar',
    length: 240,
    nullable: true,
  })
  referenciasUbicacion!: string | null;

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

  @Column({ name: 'es_principal', type: 'boolean', default: () => 'false' })
  esPrincipal!: boolean;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @Column({
    name: 'actualizado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  actualizadoEn!: Date;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  usuario!: Relation<Usuario>;

  @ManyToOne(() => Ciudad, { nullable: true })
  @JoinColumn({ name: 'ciudad_id', referencedColumnName: 'id' })
  ciudad!: Relation<Ciudad> | null;
}
