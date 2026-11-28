import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { OrdenCompra } from '../../commerce/entities/ordenes-compra.entity';
import { Proveedor } from '../../catalog/entities/proveedores.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * monto: CHECK(monto > 0)
 * estado: CHECK(estado IN ('pendiente','aprobado','enviado','confirmado','fallido'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({
  schema: 'finance',
  name: 'liquidaciones_proveedor',
  synchronize: false,
})
export class LiquidacionProveedor {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'orden_compra_id', type: 'uuid' })
  ordenCompraId!: string;

  @Column({ name: 'proveedor_id', type: 'uuid' })
  proveedorId!: string;

  @Column({ name: 'monto', type: 'numeric', precision: 24, scale: 7 })
  monto!: string;

  @Column({ name: 'codigo_moneda', type: 'varchar', length: 12 })
  codigoMoneda!: string;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 20,
    default: () => "'pendiente'",
  })
  estado!: string;

  @Column({ name: 'aprobado_por', type: 'uuid', nullable: true })
  aprobadoPor!: string | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @Column({ name: 'confirmado_en', type: 'timestamptz', nullable: true })
  confirmadoEn!: Date | null;

  @ManyToOne(() => OrdenCompra, { nullable: false })
  @JoinColumn({ name: 'orden_compra_id', referencedColumnName: 'id' })
  ordenCompra!: Relation<OrdenCompra>;

  @ManyToOne(() => Proveedor, { nullable: false })
  @JoinColumn({ name: 'proveedor_id', referencedColumnName: 'id' })
  proveedor!: Relation<Proveedor>;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'aprobado_por', referencedColumnName: 'id' })
  aprobadoPorRelacion!: Relation<Usuario> | null;
}
