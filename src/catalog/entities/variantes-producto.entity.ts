import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Producto } from './productos.entity';

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * CHECK (peso_gramos IS NULL OR peso_gramos >= 0)
 * unidad: CHECK (unidad IN ('pieza','caja','paquete','kg','g','l','ml'))
 * unidades_por_paquete: CHECK (unidades_por_paquete > 0)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'catalog', name: 'variantes_producto', synchronize: false })
export class VarianteProducto {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'producto_id', type: 'uuid' })
  productoId!: string;

  @Column({ name: 'sku', type: 'varchar', length: 100, unique: true })
  sku!: string;

  @Column({ name: 'nombre', type: 'varchar', length: 180 })
  nombre!: string;

  @Column({
    name: 'codigo_barras',
    type: 'varchar',
    length: 80,
    nullable: true,
  })
  codigoBarras!: string | null;

  @Column({ name: 'unidad', type: 'varchar', length: 24 })
  unidad!: string;

  @Column({
    name: 'unidades_por_paquete',
    type: 'numeric',
    precision: 16,
    scale: 3,
    default: () => '1',
  })
  unidadesPorPaquete!: string;

  @Column({
    name: 'peso_gramos',
    type: 'numeric',
    precision: 14,
    scale: 3,
    nullable: true,
  })
  pesoGramos!: string | null;

  @Column({ name: 'atributos', type: 'jsonb', default: () => "'{}'::jsonb" })
  atributos!: JsonValue;

  @Column({ name: 'esta_activo', type: 'boolean', default: () => 'true' })
  estaActivo!: boolean;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @Column({
    name: 'actualizado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  actualizadoEn!: Date;

  @ManyToOne(() => Producto, { nullable: false })
  @JoinColumn({ name: 'producto_id', referencedColumnName: 'id' })
  producto!: Relation<Producto>;
}
