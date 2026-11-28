import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Usuario } from '../../identity/entities/usuarios.entity';
import { GrupoCompra } from '../../commerce/entities/grupos-compra.entity';
import { ObligacionPago } from '../../finance/entities/obligaciones-pago.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * prioridad: CHECK(prioridad IN ('baja','normal','alta','urgente'))
 * estado: CHECK(estado IN ('abierto','pendiente','resuelto','cerrado'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'support', name: 'casos_soporte', synchronize: false })
export class CasoSoporte {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'usuario_creador_id', type: 'uuid' })
  usuarioCreadorId!: string;

  @Column({ name: 'usuario_asignado_id', type: 'uuid', nullable: true })
  usuarioAsignadoId!: string | null;

  @Column({ name: 'grupo_id', type: 'uuid', nullable: true })
  grupoId!: string | null;

  @Column({ name: 'obligacion_pago_id', type: 'uuid', nullable: true })
  obligacionPagoId!: string | null;

  @Column({ name: 'asunto', type: 'varchar', length: 220 })
  asunto!: string;

  @Column({ name: 'categoria', type: 'varchar', length: 40 })
  categoria!: string;

  @Column({
    name: 'prioridad',
    type: 'varchar',
    length: 12,
    default: () => "'normal'",
  })
  prioridad!: string;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 20,
    default: () => "'abierto'",
  })
  estado!: string;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @Column({
    name: 'actualizado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  actualizadoEn!: Date;

  @Column({ name: 'cerrado_en', type: 'timestamptz', nullable: true })
  cerradoEn!: Date | null;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'usuario_creador_id', referencedColumnName: 'id' })
  usuarioCreador!: Relation<Usuario>;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'usuario_asignado_id', referencedColumnName: 'id' })
  usuarioAsignado!: Relation<Usuario> | null;

  @ManyToOne(() => GrupoCompra, { nullable: true })
  @JoinColumn({ name: 'grupo_id', referencedColumnName: 'id' })
  grupo!: Relation<GrupoCompra> | null;

  @ManyToOne(() => ObligacionPago, { nullable: true })
  @JoinColumn({ name: 'obligacion_pago_id', referencedColumnName: 'id' })
  obligacionPago!: Relation<ObligacionPago> | null;
}
