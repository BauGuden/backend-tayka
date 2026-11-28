import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Red } from './redes.entity';
import { Billetera } from './billeteras.entity';

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * UNIQUE(red_id,hash_transaccion)
 * estado: CHECK(estado IN ('enviado','pendiente','exitoso','fallido','desconocido'))
 * comision_stroops: CHECK(comision_stroops IS NULL OR comision_stroops >= 0)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'blockchain', name: 'transacciones', synchronize: false })
export class Transaccion {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'red_id', type: 'uuid' })
  redId!: string;

  @Column({ name: 'hash_transaccion', type: 'varchar', length: 128 })
  hashTransaccion!: string;

  @Column({ name: 'billetera_origen_id', type: 'uuid', nullable: true })
  billeteraOrigenId!: string | null;

  @Column({ name: 'secuencia_libro_mayor', type: 'bigint', nullable: true })
  secuenciaLibroMayor!: string | null;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 20,
    default: () => "'enviado'",
  })
  estado!: string;

  @Column({ name: 'comision_stroops', type: 'bigint', nullable: true })
  comisionStroops!: string | null;

  @Column({ name: 'enviado_en', type: 'timestamptz', default: () => 'now()' })
  enviadoEn!: Date;

  @Column({ name: 'confirmado_en', type: 'timestamptz', nullable: true })
  confirmadoEn!: Date | null;

  @Column({ name: 'resultado_bruto', type: 'jsonb', nullable: true })
  resultadoBruto!: JsonValue | null;

  @ManyToOne(() => Red, { nullable: false })
  @JoinColumn({ name: 'red_id', referencedColumnName: 'id' })
  red!: Relation<Red>;

  @ManyToOne(() => Billetera, { nullable: true })
  @JoinColumn({ name: 'billetera_origen_id', referencedColumnName: 'id' })
  billeteraOrigen!: Relation<Billetera> | null;
}
