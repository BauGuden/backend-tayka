import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Proveedor } from '../../catalog/entities/proveedores.entity';
import { VarianteProducto } from '../../catalog/entities/variantes-producto.entity';
import { Almacen } from '../../catalog/entities/almacenes.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * CHECK(vigente_hasta > vigente_desde)
 * CHECK(cantidad_maxima IS NULL OR cantidad_maxima >= cantidad_minima_pedido)
 * precio_unitario: CHECK (precio_unitario >= 0)
 * precio_minorista_referencia: CHECK(precio_minorista_referencia IS NULL OR precio_minorista_referencia >= 0)
 * cantidad_minima_pedido: CHECK (cantidad_minima_pedido > 0)
 * minimo_compradores: CHECK(minimo_compradores >= 0)
 * cantidad_maxima: CHECK(cantidad_maxima IS NULL OR cantidad_maxima > 0)
 * estado: CHECK (estado IN ('borrador','autorizado','activo','pausado','vencido','revocado'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'commerce', name: 'ofertas', synchronize: false })
export class Oferta {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'proveedor_id', type: 'uuid' })
  proveedorId!: string;

  @Column({ name: 'variante_id', type: 'uuid' })
  varianteId!: string;

  @Column({ name: 'almacen_id', type: 'uuid', nullable: true })
  almacenId!: string | null;

  @Column({ name: 'autorizado_por', type: 'uuid', nullable: true })
  autorizadoPor!: string | null;

  @Column({ name: 'titulo', type: 'varchar', length: 220 })
  titulo!: string;

  @Column({ name: 'descripcion_condiciones', type: 'text', nullable: true })
  descripcionCondiciones!: string | null;

  @Column({
    name: 'codigo_moneda',
    type: 'varchar',
    length: 12,
    default: () => "'BOB'",
  })
  codigoMoneda!: string;

  @Column({ name: 'precio_unitario', type: 'numeric', precision: 20, scale: 7 })
  precioUnitario!: string;

  @Column({
    name: 'precio_minorista_referencia',
    type: 'numeric',
    precision: 20,
    scale: 7,
    nullable: true,
  })
  precioMinoristaReferencia!: string | null;

  @Column({
    name: 'cantidad_minima_pedido',
    type: 'numeric',
    precision: 16,
    scale: 3,
  })
  cantidadMinimaPedido!: string;

  @Column({ name: 'minimo_compradores', type: 'integer', default: () => '0' })
  minimoCompradores!: number;

  @Column({
    name: 'cantidad_maxima',
    type: 'numeric',
    precision: 16,
    scale: 3,
    nullable: true,
  })
  cantidadMaxima!: string | null;

  @Column({ name: 'vigente_desde', type: 'timestamptz' })
  vigenteDesde!: Date;

  @Column({ name: 'vigente_hasta', type: 'timestamptz' })
  vigenteHasta!: Date;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 22,
    default: () => "'borrador'",
  })
  estado!: string;

  @Column({ name: 'condiciones_garantia', type: 'text', nullable: true })
  condicionesGarantia!: string | null;

  @Column({ name: 'condiciones_devolucion', type: 'text', nullable: true })
  condicionesDevolucion!: string | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @Column({
    name: 'actualizado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  actualizadoEn!: Date;

  @ManyToOne(() => Proveedor, { nullable: false })
  @JoinColumn({ name: 'proveedor_id', referencedColumnName: 'id' })
  proveedor!: Relation<Proveedor>;

  @ManyToOne(() => VarianteProducto, { nullable: false })
  @JoinColumn({ name: 'variante_id', referencedColumnName: 'id' })
  variante!: Relation<VarianteProducto>;

  @ManyToOne(() => Almacen, { nullable: true })
  @JoinColumn({ name: 'almacen_id', referencedColumnName: 'id' })
  almacen!: Relation<Almacen> | null;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'autorizado_por', referencedColumnName: 'id' })
  autorizadoPorRelacion!: Relation<Usuario> | null;
}
