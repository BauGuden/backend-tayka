import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  type Relation,
} from 'typeorm';
import { GrupoCompra } from './grupos-compra.entity';
import { Proveedor } from '../../catalog/entities/proveedores.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * estado: CHECK(estado IN ('preparado','enviado','aceptado','cumplido','cancelado','fallido'))
 * cantidad_total: CHECK(cantidad_total > 0)
 * subtotal: CHECK(subtotal >= 0)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'commerce', name: 'ordenes_compra', synchronize: false })
export class OrdenCompra {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'grupo_id', type: 'uuid', unique: true })
  grupoId!: string;

  @Column({ name: 'proveedor_id', type: 'uuid' })
  proveedorId!: string;

  @Column({ name: 'numero_orden', type: 'varchar', length: 50, unique: true })
  numeroOrden!: string;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 24,
    default: () => "'preparado'",
  })
  estado!: string;

  @Column({ name: 'cantidad_total', type: 'numeric', precision: 16, scale: 3 })
  cantidadTotal!: string;

  @Column({ name: 'subtotal', type: 'numeric', precision: 24, scale: 7 })
  subtotal!: string;

  @Column({
    name: 'codigo_moneda',
    type: 'varchar',
    length: 12,
    default: () => "'BOB'",
  })
  codigoMoneda!: string;

  @Column({
    name: 'referencia_externa_proveedor',
    type: 'varchar',
    length: 120,
    nullable: true,
  })
  referenciaExternaProveedor!: string | null;

  @Column({ name: 'emitido_por', type: 'uuid' })
  emitidoPor!: string;

  @Column({ name: 'emitido_en', type: 'timestamptz', nullable: true })
  emitidoEn!: Date | null;

  @Column({ name: 'aceptado_en', type: 'timestamptz', nullable: true })
  aceptadoEn!: Date | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @Column({
    name: 'actualizado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  actualizadoEn!: Date;

  @OneToOne(() => GrupoCompra, { nullable: false })
  @JoinColumn({ name: 'grupo_id', referencedColumnName: 'id' })
  grupo!: Relation<GrupoCompra>;

  @ManyToOne(() => Proveedor, { nullable: false })
  @JoinColumn({ name: 'proveedor_id', referencedColumnName: 'id' })
  proveedor!: Relation<Proveedor>;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'emitido_por', referencedColumnName: 'id' })
  emitidoPorRelacion!: Relation<Usuario>;
}
