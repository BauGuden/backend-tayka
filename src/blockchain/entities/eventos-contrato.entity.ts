import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { Transaccion } from './transacciones.entity';
import { DespliegueContrato } from './despliegues-contrato.entity';

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * UNIQUE(transaccion_id,indice_evento)
 * indice_evento: CHECK(indice_evento >= 0)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'blockchain', name: 'eventos_contrato', synchronize: false })
export class EventoContrato {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'transaccion_id', type: 'uuid' })
  transaccionId!: string;

  @Column({ name: 'despliegue_id', type: 'uuid', nullable: true })
  despliegueId!: string | null;

  @Column({ name: 'indice_evento', type: 'integer' })
  indiceEvento!: number;

  @Column({ name: 'tipo_evento', type: 'varchar', length: 100, nullable: true })
  tipoEvento!: string | null;

  @Column({ name: 'temas', type: 'jsonb', default: () => "'[]'::jsonb" })
  temas!: JsonValue;

  @Column({ name: 'datos', type: 'jsonb', default: () => "'{}'::jsonb" })
  datos!: JsonValue;

  @Column({ name: 'secuencia_libro_mayor', type: 'bigint', nullable: true })
  secuenciaLibroMayor!: string | null;

  @Column({
    name: 'registrado_en',
    type: 'timestamptz',
    default: () => 'now()',
  })
  registradoEn!: Date;

  @ManyToOne(() => Transaccion, { nullable: false })
  @JoinColumn({ name: 'transaccion_id', referencedColumnName: 'id' })
  transaccion!: Relation<Transaccion>;

  @ManyToOne(() => DespliegueContrato, { nullable: true })
  @JoinColumn({ name: 'despliegue_id', referencedColumnName: 'id' })
  despliegue!: Relation<DespliegueContrato> | null;
}
