import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Almacen } from './almacenes.entity';
import { VarianteProducto } from './variantes-producto.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * UNIQUE(almacen_id,variante_id)
 * CHECK(cantidad_reservada <= cantidad_existente)
 * cantidad_existente: CHECK (cantidad_existente >= 0)
 * cantidad_reservada: CHECK (cantidad_reservada >= 0)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'catalog', name: 'existencias', synchronize: false })
export class Existencia {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'almacen_id', type: 'uuid' })
  almacenId!: string;

  @Column({ name: 'variante_id', type: 'uuid' })
  varianteId!: string;

  @Column({
    name: 'cantidad_existente',
    type: 'numeric',
    precision: 16,
    scale: 3,
    default: () => '0',
  })
  cantidadExistente!: string;

  @Column({
    name: 'cantidad_reservada',
    type: 'numeric',
    precision: 16,
    scale: 3,
    default: () => '0',
  })
  cantidadReservada!: string;

  @Column({
    name: 'actualizado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  actualizadoEn!: Date;

  @ManyToOne(() => Almacen, { nullable: false })
  @JoinColumn({ name: 'almacen_id', referencedColumnName: 'id' })
  almacen!: Relation<Almacen>;

  @ManyToOne(() => VarianteProducto, { nullable: false })
  @JoinColumn({ name: 'variante_id', referencedColumnName: 'id' })
  variante!: Relation<VarianteProducto>;
}
