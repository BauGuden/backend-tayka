import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Transferencia } from './transferencias.entity';
import { Usuario } from '../../identity/entities/usuarios.entity';

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * fuente_verificacion: CHECK(fuente_verificacion IN ('api_bancaria','proveedor_pagos','rpc_stellar','manual_autorizado','dato_prueba'))
 * resultado: CHECK(resultado IN ('coincidente','no_coincidente','pendiente','duplicado','rechazado'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'finance', name: 'conciliaciones', synchronize: false })
export class Conciliacion {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'transferencia_id', type: 'uuid' })
  transferenciaId!: string;

  @Column({ name: 'verificado_por', type: 'uuid', nullable: true })
  verificadoPor!: string | null;

  @Column({ name: 'fuente_verificacion', type: 'varchar', length: 32 })
  fuenteVerificacion!: string;

  @Column({ name: 'resultado', type: 'varchar', length: 20 })
  resultado!: string;

  @Column({
    name: 'transaccion_proveedor_id',
    type: 'varchar',
    length: 180,
    nullable: true,
  })
  transaccionProveedorId!: string | null;

  @Column({ name: 'evidencia', type: 'jsonb', default: () => "'{}'::jsonb" })
  evidencia!: JsonValue;

  @Column({
    name: 'verificado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  verificadoEn!: Date;

  @Column({ name: 'notas', type: 'text', nullable: true })
  notas!: string | null;

  @ManyToOne(() => Transferencia, { nullable: false })
  @JoinColumn({ name: 'transferencia_id', referencedColumnName: 'id' })
  transferencia!: Relation<Transferencia>;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'verificado_por', referencedColumnName: 'id' })
  verificadoPorRelacion!: Relation<Usuario> | null;
}
