import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { OrdenCompra } from './ordenes-compra.entity';
import { VarianteProducto } from '../../catalog/entities/variantes-producto.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * UNIQUE(orden_compra_id,variante_id)
 * cantidad: CHECK(cantidad > 0)
 * precio_unitario: CHECK(precio_unitario >= 0)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({
  schema: 'commerce',
  name: 'detalles_orden_compra',
  synchronize: false,
})
export class DetalleOrdenCompra {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'orden_compra_id', type: 'uuid' })
  ordenCompraId!: string;

  @Column({ name: 'variante_id', type: 'uuid' })
  varianteId!: string;

  @Column({ name: 'cantidad', type: 'numeric', precision: 16, scale: 3 })
  cantidad!: string;

  @Column({ name: 'precio_unitario', type: 'numeric', precision: 20, scale: 7 })
  precioUnitario!: string;

  @Column({
    name: 'total_linea',
    type: 'numeric',
    precision: 24,
    scale: 7,
    nullable: true,
    asExpression: 'cantidad * precio_unitario',
    generatedType: 'STORED',
    insert: false,
    update: false,
  })
  readonly totalLinea!: string | null;

  @ManyToOne(() => OrdenCompra, { nullable: false })
  @JoinColumn({ name: 'orden_compra_id', referencedColumnName: 'id' })
  ordenCompra!: Relation<OrdenCompra>;

  @ManyToOne(() => VarianteProducto, { nullable: false })
  @JoinColumn({ name: 'variante_id', referencedColumnName: 'id' })
  variante!: Relation<VarianteProducto>;
}
