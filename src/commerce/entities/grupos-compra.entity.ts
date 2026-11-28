import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Oferta } from './ofertas.entity';
import { VersionOferta } from './versiones-oferta.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * CHECK(plazo_adhesion > abierto_en)
 * CHECK(plazo_adhesion <= abierto_en + interval '7 days')
 * CHECK(plazo_pago IS NULL OR (pago_abierto_en IS NOT NULL AND plazo_pago > pago_abierto_en))
 * estado: CHECK(estado IN ('abierto','pago_abierto','incidencia','listo_para_compra','comprado','en_transito','disponible','completado','vencido','cancelado'))
 * cantidad_minima_fijada: CHECK(cantidad_minima_fijada > 0)
 * minimo_compradores_fijado: CHECK(minimo_compradores_fijado >= 0)
 * precio_fijado: CHECK(precio_fijado >= 0)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'commerce', name: 'grupos_compra', synchronize: false })
export class GrupoCompra {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'oferta_id', type: 'uuid' })
  ofertaId!: string;

  @Column({ name: 'version_oferta_id', type: 'uuid' })
  versionOfertaId!: string;

  @Column({ name: 'abierto_por', type: 'uuid' })
  abiertoPor!: string;

  @Column({ name: 'codigo_grupo', type: 'varchar', length: 40, unique: true })
  codigoGrupo!: string;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 26,
    default: () => "'abierto'",
  })
  estado!: string;

  @Column({
    name: 'cantidad_minima_fijada',
    type: 'numeric',
    precision: 16,
    scale: 3,
  })
  cantidadMinimaFijada!: string;

  @Column({ name: 'minimo_compradores_fijado', type: 'integer' })
  minimoCompradoresFijado!: number;

  @Column({ name: 'precio_fijado', type: 'numeric', precision: 20, scale: 7 })
  precioFijado!: string;

  @Column({
    name: 'codigo_moneda',
    type: 'varchar',
    length: 12,
    default: () => "'BOB'",
  })
  codigoMoneda!: string;

  @Column({ name: 'abierto_en', type: 'timestamptz', default: () => 'now()' })
  abiertoEn!: Date;

  @Column({ name: 'plazo_adhesion', type: 'timestamptz' })
  plazoAdhesion!: Date;

  @Column({ name: 'pago_abierto_en', type: 'timestamptz', nullable: true })
  pagoAbiertoEn!: Date | null;

  @Column({ name: 'plazo_pago', type: 'timestamptz', nullable: true })
  plazoPago!: Date | null;

  @Column({ name: 'cerrado_en', type: 'timestamptz', nullable: true })
  cerradoEn!: Date | null;

  @Column({ name: 'motivo_cancelacion', type: 'text', nullable: true })
  motivoCancelacion!: string | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @Column({
    name: 'actualizado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  actualizadoEn!: Date;

  @ManyToOne(() => Oferta, { nullable: false })
  @JoinColumn({ name: 'oferta_id', referencedColumnName: 'id' })
  oferta!: Relation<Oferta>;

  @ManyToOne(() => VersionOferta, { nullable: false })
  @JoinColumn({ name: 'version_oferta_id', referencedColumnName: 'id' })
  versionOferta!: Relation<VersionOferta>;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'abierto_por', referencedColumnName: 'id' })
  abiertoPorRelacion!: Relation<Usuario>;
}
