import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Existencia } from '../../catalog/entities/existencias.entity';
import { GrupoCompra } from './grupos-compra.entity';
import { OrdenCompra } from './ordenes-compra.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * UNIQUE(orden_compra_id,existencia_id)
 * cantidad_reservada: CHECK(cantidad_reservada > 0)
 * estado: CHECK(estado IN ('activo','consumido','liberado','vencido'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'commerce', name: 'reservas_inventario', synchronize: false })
export class ReservaInventario {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'existencia_id', type: 'uuid' })
  existenciaId!: string;

  @Column({ name: 'grupo_id', type: 'uuid' })
  grupoId!: string;

  @Column({ name: 'orden_compra_id', type: 'uuid' })
  ordenCompraId!: string;

  @Column({
    name: 'cantidad_reservada',
    type: 'numeric',
    precision: 16,
    scale: 3,
  })
  cantidadReservada!: string;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 16,
    default: () => "'activo'",
  })
  estado!: string;

  @Column({ name: 'reservado_en', type: 'timestamptz', default: () => 'now()' })
  reservadoEn!: Date;

  @Column({ name: 'liberado_en', type: 'timestamptz', nullable: true })
  liberadoEn!: Date | null;

  @ManyToOne(() => Existencia, { nullable: false })
  @JoinColumn({ name: 'existencia_id', referencedColumnName: 'id' })
  existencia!: Relation<Existencia>;

  @ManyToOne(() => GrupoCompra, { nullable: false })
  @JoinColumn({ name: 'grupo_id', referencedColumnName: 'id' })
  grupo!: Relation<GrupoCompra>;

  @ManyToOne(() => OrdenCompra, { nullable: false })
  @JoinColumn({ name: 'orden_compra_id', referencedColumnName: 'id' })
  ordenCompra!: Relation<OrdenCompra>;
}
