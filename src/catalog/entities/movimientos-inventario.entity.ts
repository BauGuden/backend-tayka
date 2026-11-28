import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Existencia } from './existencias.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * tipo_movimiento: CHECK (tipo_movimiento IN ('inicial','recepcion','venta','ajuste','devolucion','dano'))
 * variacion_cantidad: CHECK (variacion_cantidad <> 0)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({
  schema: 'catalog',
  name: 'movimientos_inventario',
  synchronize: false,
})
export class MovimientoInventario {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'existencia_id', type: 'uuid' })
  existenciaId!: string;

  @Column({ name: 'usuario_actor_id', type: 'uuid', nullable: true })
  usuarioActorId!: string | null;

  @Column({ name: 'tipo_movimiento', type: 'varchar', length: 25 })
  tipoMovimiento!: string;

  @Column({
    name: 'variacion_cantidad',
    type: 'numeric',
    precision: 16,
    scale: 3,
  })
  variacionCantidad!: string;

  @Column({ name: 'motivo', type: 'text', nullable: true })
  motivo!: string | null;

  @Column({
    name: 'referencia_externa',
    type: 'varchar',
    length: 120,
    nullable: true,
  })
  referenciaExterna!: string | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @ManyToOne(() => Existencia, { nullable: false })
  @JoinColumn({ name: 'existencia_id', referencedColumnName: 'id' })
  existencia!: Relation<Existencia>;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'usuario_actor_id', referencedColumnName: 'id' })
  usuarioActor!: Relation<Usuario> | null;
}
