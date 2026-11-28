import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  type Relation,
} from 'typeorm';
import { ParticipanteGrupo } from '../../commerce/entities/participantes-grupo.entity';
import { MedioPago } from './medios-pago.entity';

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * CHECK(monto_verificado <= monto_adeudado)
 * monto_adeudado: CHECK(monto_adeudado >= 0)
 * monto_verificado: CHECK(monto_verificado >= 0)
 * estado: CHECK(estado IN ('creado','pendiente','pago_parcial','pagado','fallido','vencido','reembolsado'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'finance', name: 'obligaciones_pago', synchronize: false })
export class ObligacionPago {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'participante_grupo_id', type: 'uuid', unique: true })
  participanteGrupoId!: string;

  @Column({ name: 'medio_pago_id', type: 'uuid', nullable: true })
  medioPagoId!: string | null;

  @Column({ name: 'monto_adeudado', type: 'numeric', precision: 24, scale: 7 })
  montoAdeudado!: string;

  @Column({
    name: 'monto_verificado',
    type: 'numeric',
    precision: 24,
    scale: 7,
    default: () => '0',
  })
  montoVerificado!: string;

  @Column({ name: 'codigo_moneda', type: 'varchar', length: 12 })
  codigoMoneda!: string;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 24,
    default: () => "'creado'",
  })
  estado!: string;

  @Column({ name: 'vence_en', type: 'timestamptz' })
  venceEn!: Date;

  @Column({ name: 'pagado_en', type: 'timestamptz', nullable: true })
  pagadoEn!: Date | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @Column({
    name: 'actualizado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  actualizadoEn!: Date;

  @OneToOne(() => ParticipanteGrupo, { nullable: false })
  @JoinColumn({ name: 'participante_grupo_id', referencedColumnName: 'id' })
  participanteGrupo!: Relation<ParticipanteGrupo>;

  @ManyToOne(() => MedioPago, { nullable: true })
  @JoinColumn({ name: 'medio_pago_id', referencedColumnName: 'id' })
  medioPago!: Relation<MedioPago> | null;
}
