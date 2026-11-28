import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { MedioPago } from './medios-pago.entity';
import { ObligacionPago } from './obligaciones-pago.entity';
import { Reembolso } from './reembolsos.entity';
import { LiquidacionProveedor } from './liquidaciones-proveedor.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * CHECK( (clase = 'cobro' AND obligacion_pago_id IS NOT NULL AND reembolso_id IS NULL AND liquidacion_proveedor_id IS NULL) OR (clase = 'reembolso' AND obligacion_pago_id IS NULL AND reembolso_id IS NOT NULL AND liquidacion_proveedor_id IS NULL) OR (clase = 'liquidacion_proveedor' AND obligacion_pago_id IS NULL AND reembolso_id IS NULL AND liquidacion_proveedor_id IS NOT NULL) OR (clase = 'ajuste' AND obligacion_pago_id IS NULL AND reembolso_id IS NULL AND liquidacion_proveedor_id IS NULL) )
 * clase: CHECK(clase IN ('cobro','reembolso','liquidacion_proveedor','ajuste'))
 * monto: CHECK(monto > 0)
 * estado: CHECK(estado IN ('declarado','pendiente_verificacion','verificado','rechazado','fallido','revertido'))
 * CREATE UNIQUE INDEX unica_referencia_transferencia_medio ON finance.transferencias(medio_pago_id, referencia_externa) WHERE referencia_externa IS NOT NULL;
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'finance', name: 'transferencias', synchronize: false })
export class Transferencia {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'medio_pago_id', type: 'uuid' })
  medioPagoId!: string;

  @Column({ name: 'clase', type: 'varchar', length: 24 })
  clase!: string;

  @Column({ name: 'obligacion_pago_id', type: 'uuid', nullable: true })
  obligacionPagoId!: string | null;

  @Column({ name: 'reembolso_id', type: 'uuid', nullable: true })
  reembolsoId!: string | null;

  @Column({ name: 'liquidacion_proveedor_id', type: 'uuid', nullable: true })
  liquidacionProveedorId!: string | null;

  @Column({ name: 'iniciado_por', type: 'uuid', nullable: true })
  iniciadoPor!: string | null;

  @Column({ name: 'monto', type: 'numeric', precision: 24, scale: 7 })
  monto!: string;

  @Column({ name: 'codigo_moneda', type: 'varchar', length: 12 })
  codigoMoneda!: string;

  @Column({
    name: 'referencia_origen',
    type: 'varchar',
    length: 140,
    nullable: true,
  })
  referenciaOrigen!: string | null;

  @Column({
    name: 'referencia_destinatario',
    type: 'varchar',
    length: 140,
    nullable: true,
  })
  referenciaDestinatario!: string | null;

  @Column({
    name: 'referencia_externa',
    type: 'varchar',
    length: 180,
    nullable: true,
  })
  referenciaExterna!: string | null;

  @Column({
    name: 'clave_idempotencia',
    type: 'varchar',
    length: 160,
    nullable: true,
    unique: true,
  })
  claveIdempotencia!: string | null;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 24,
    default: () => "'declarado'",
  })
  estado!: string;

  @Column({ name: 'url_comprobante', type: 'text', nullable: true })
  urlComprobante!: string | null;

  @Column({
    name: 'datos_transferencia',
    type: 'jsonb',
    default: () => "'{}'::jsonb",
  })
  datosTransferencia!: JsonValue;

  @Column({ name: 'declarado_en', type: 'timestamptz', default: () => 'now()' })
  declaradoEn!: Date;

  @Column({ name: 'verificado_en', type: 'timestamptz', nullable: true })
  verificadoEn!: Date | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @Column({
    name: 'actualizado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  actualizadoEn!: Date;

  @ManyToOne(() => MedioPago, { nullable: false })
  @JoinColumn({ name: 'medio_pago_id', referencedColumnName: 'id' })
  medioPago!: Relation<MedioPago>;

  @ManyToOne(() => ObligacionPago, { nullable: true })
  @JoinColumn({ name: 'obligacion_pago_id', referencedColumnName: 'id' })
  obligacionPago!: Relation<ObligacionPago> | null;

  @ManyToOne(() => Reembolso, { nullable: true })
  @JoinColumn({ name: 'reembolso_id', referencedColumnName: 'id' })
  reembolso!: Relation<Reembolso> | null;

  @ManyToOne(() => LiquidacionProveedor, { nullable: true })
  @JoinColumn({ name: 'liquidacion_proveedor_id', referencedColumnName: 'id' })
  liquidacionProveedor!: Relation<LiquidacionProveedor> | null;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'iniciado_por', referencedColumnName: 'id' })
  iniciadoPorRelacion!: Relation<Usuario> | null;
}
