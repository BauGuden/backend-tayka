import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  type Relation,
} from 'typeorm';
import { AsignacionOrden } from '../../commerce/entities/asignaciones-orden.entity';
import { PuntoRetiro } from './puntos-retiro.entity';
import { Transportista } from './transportistas.entity';

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * CHECK(modalidad_entrega <> 'retiro' OR punto_retiro_id IS NOT NULL)
 * modalidad_entrega: CHECK(modalidad_entrega IN ('retiro','envio'))
 * costo: CHECK(costo >= 0)
 * estado: CHECK(estado IN ('pendiente','preparando','en_transito','disponible','entregado','fallido','devuelto'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'logistics', name: 'entregas', synchronize: false })
export class Entrega {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'asignacion_orden_id', type: 'uuid', unique: true })
  asignacionOrdenId!: string;

  @Column({ name: 'modalidad_entrega', type: 'varchar', length: 18 })
  modalidadEntrega!: string;

  @Column({ name: 'punto_retiro_id', type: 'uuid', nullable: true })
  puntoRetiroId!: string | null;

  @Column({ name: 'datos_destino', type: 'jsonb', nullable: true })
  datosDestino!: JsonValue | null;

  @Column({ name: 'transportista_id', type: 'uuid', nullable: true })
  transportistaId!: string | null;

  @Column({
    name: 'numero_seguimiento',
    type: 'varchar',
    length: 140,
    nullable: true,
  })
  numeroSeguimiento!: string | null;

  @Column({
    name: 'costo',
    type: 'numeric',
    precision: 24,
    scale: 7,
    default: () => '0',
  })
  costo!: string;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 24,
    default: () => "'pendiente'",
  })
  estado!: string;

  @Column({ name: 'entregado_en', type: 'timestamptz', nullable: true })
  entregadoEn!: Date | null;

  @Column({
    name: 'nombre_receptor',
    type: 'varchar',
    length: 180,
    nullable: true,
  })
  nombreReceptor!: string | null;

  @Column({ name: 'url_constancia', type: 'text', nullable: true })
  urlConstancia!: string | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @Column({
    name: 'actualizado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  actualizadoEn!: Date;

  @OneToOne(() => AsignacionOrden, { nullable: false })
  @JoinColumn({ name: 'asignacion_orden_id', referencedColumnName: 'id' })
  asignacionOrden!: Relation<AsignacionOrden>;

  @ManyToOne(() => PuntoRetiro, { nullable: true })
  @JoinColumn({ name: 'punto_retiro_id', referencedColumnName: 'id' })
  puntoRetiro!: Relation<PuntoRetiro> | null;

  @ManyToOne(() => Transportista, { nullable: true })
  @JoinColumn({ name: 'transportista_id', referencedColumnName: 'id' })
  transportista!: Relation<Transportista> | null;
}
