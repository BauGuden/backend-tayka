import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Producto } from './productos.entity';
import { VarianteProducto } from './variantes-producto.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * tipo_archivo: CHECK(tipo_archivo IN ('imagen','video'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'catalog', name: 'archivos_producto', synchronize: false })
export class ArchivoProducto {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'producto_id', type: 'uuid' })
  productoId!: string;

  @Column({ name: 'variante_id', type: 'uuid', nullable: true })
  varianteId!: string | null;

  @Column({ name: 'url_archivo', type: 'text' })
  urlArchivo!: string;

  @Column({
    name: 'texto_alternativo',
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  textoAlternativo!: string | null;

  @Column({
    name: 'tipo_archivo',
    type: 'varchar',
    length: 15,
    default: () => "'imagen'",
  })
  tipoArchivo!: string;

  @Column({ name: 'orden_visualizacion', type: 'integer', default: () => '0' })
  ordenVisualizacion!: number;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @ManyToOne(() => Producto, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'producto_id', referencedColumnName: 'id' })
  producto!: Relation<Producto>;

  @ManyToOne(() => VarianteProducto, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'variante_id', referencedColumnName: 'id' })
  variante!: Relation<VarianteProducto> | null;
}
