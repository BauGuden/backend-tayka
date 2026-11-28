import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { ObligacionPago } from './obligaciones-pago.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * monto: CHECK(monto > 0)
 * estado: CHECK(estado IN ('solicitado','aprobado','procesando','completado','rechazado','fallido'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'finance', name: 'reembolsos', synchronize: false })
export class Reembolso {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'obligacion_pago_id', type: 'uuid' })
  obligacionPagoId!: string;

  @Column({ name: 'motivo', type: 'varchar', length: 70 })
  motivo!: string;

  @Column({ name: 'monto', type: 'numeric', precision: 24, scale: 7 })
  monto!: string;

  @Column({ name: 'codigo_moneda', type: 'varchar', length: 12 })
  codigoMoneda!: string;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 20,
    default: () => "'solicitado'",
  })
  estado!: string;

  @Column({ name: 'solicitado_por', type: 'uuid', nullable: true })
  solicitadoPor!: string | null;

  @Column({ name: 'aprobado_por', type: 'uuid', nullable: true })
  aprobadoPor!: string | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @Column({ name: 'completado_en', type: 'timestamptz', nullable: true })
  completadoEn!: Date | null;

  @Column({ name: 'notas', type: 'text', nullable: true })
  notas!: string | null;

  @ManyToOne(() => ObligacionPago, { nullable: false })
  @JoinColumn({ name: 'obligacion_pago_id', referencedColumnName: 'id' })
  obligacionPago!: Relation<ObligacionPago>;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'solicitado_por', referencedColumnName: 'id' })
  solicitadoPorRelacion!: Relation<Usuario> | null;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'aprobado_por', referencedColumnName: 'id' })
  aprobadoPorRelacion!: Relation<Usuario> | null;
}
