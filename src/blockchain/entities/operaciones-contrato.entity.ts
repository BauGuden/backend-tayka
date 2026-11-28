import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { DespliegueContrato } from './despliegues-contrato.entity';
import { Transaccion } from './transacciones.entity';
import { GrupoCompra } from '../../commerce/entities/grupos-compra.entity';
import { ParticipanteGrupo } from '../../commerce/entities/participantes-grupo.entity';
import { ObligacionPago } from '../../finance/entities/obligaciones-pago.entity';
import { Transferencia } from '../../finance/entities/transferencias.entity';
import { Reembolso } from '../../finance/entities/reembolsos.entity';
import { OrdenCompra } from '../../commerce/entities/ordenes-compra.entity';

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * tipo_operacion: CHECK(tipo_operacion IN ('crear_grupo','depositar','confirmar','liberar','reembolso','cancelar','otro'))
 * estado: CHECK(estado IN ('creado','enviado','confirmado','fallido','revertido'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({
  schema: 'blockchain',
  name: 'operaciones_contrato',
  synchronize: false,
})
export class OperacionContrato {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'despliegue_id', type: 'uuid' })
  despliegueId!: string;

  @Column({ name: 'transaccion_id', type: 'uuid', nullable: true })
  transaccionId!: string | null;

  @Column({ name: 'tipo_operacion', type: 'varchar', length: 40 })
  tipoOperacion!: string;

  @Column({ name: 'grupo_id', type: 'uuid', nullable: true })
  grupoId!: string | null;

  @Column({ name: 'participante_id', type: 'uuid', nullable: true })
  participanteId!: string | null;

  @Column({ name: 'obligacion_pago_id', type: 'uuid', nullable: true })
  obligacionPagoId!: string | null;

  @Column({ name: 'transferencia_id', type: 'uuid', nullable: true })
  transferenciaId!: string | null;

  @Column({ name: 'reembolso_id', type: 'uuid', nullable: true })
  reembolsoId!: string | null;

  @Column({ name: 'orden_compra_id', type: 'uuid', nullable: true })
  ordenCompraId!: string | null;

  @Column({
    name: 'clave_grupo_contrato',
    type: 'varchar',
    length: 140,
    nullable: true,
  })
  claveGrupoContrato!: string | null;

  @Column({ name: 'solicitud_id', type: 'varchar', length: 150, unique: true })
  solicitudId!: string;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 22,
    default: () => "'creado'",
  })
  estado!: string;

  @Column({ name: 'argumentos', type: 'jsonb', default: () => "'{}'::jsonb" })
  argumentos!: JsonValue;

  @Column({ name: 'resultado', type: 'jsonb', nullable: true })
  resultado!: JsonValue | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @Column({
    name: 'actualizado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  actualizadoEn!: Date;

  @ManyToOne(() => DespliegueContrato, { nullable: false })
  @JoinColumn({ name: 'despliegue_id', referencedColumnName: 'id' })
  despliegue!: Relation<DespliegueContrato>;

  @ManyToOne(() => Transaccion, { nullable: true })
  @JoinColumn({ name: 'transaccion_id', referencedColumnName: 'id' })
  transaccion!: Relation<Transaccion> | null;

  @ManyToOne(() => GrupoCompra, { nullable: true })
  @JoinColumn({ name: 'grupo_id', referencedColumnName: 'id' })
  grupo!: Relation<GrupoCompra> | null;

  @ManyToOne(() => ParticipanteGrupo, { nullable: true })
  @JoinColumn({ name: 'participante_id', referencedColumnName: 'id' })
  participante!: Relation<ParticipanteGrupo> | null;

  @ManyToOne(() => ObligacionPago, { nullable: true })
  @JoinColumn({ name: 'obligacion_pago_id', referencedColumnName: 'id' })
  obligacionPago!: Relation<ObligacionPago> | null;

  @ManyToOne(() => Transferencia, { nullable: true })
  @JoinColumn({ name: 'transferencia_id', referencedColumnName: 'id' })
  transferencia!: Relation<Transferencia> | null;

  @ManyToOne(() => Reembolso, { nullable: true })
  @JoinColumn({ name: 'reembolso_id', referencedColumnName: 'id' })
  reembolso!: Relation<Reembolso> | null;

  @ManyToOne(() => OrdenCompra, { nullable: true })
  @JoinColumn({ name: 'orden_compra_id', referencedColumnName: 'id' })
  ordenCompra!: Relation<OrdenCompra> | null;
}
