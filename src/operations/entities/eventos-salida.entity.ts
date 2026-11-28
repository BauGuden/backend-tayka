import { Entity, PrimaryColumn, Column } from 'typeorm';

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * estado: CHECK(estado IN ('pendiente','procesando','enviado','fallido'))
 * cantidad_reintentos: CHECK(cantidad_reintentos >= 0)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({ schema: 'operations', name: 'eventos_salida', synchronize: false })
export class EventoSalida {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'tipo_agregado', type: 'varchar', length: 80 })
  tipoAgregado!: string;

  @Column({ name: 'agregado_id', type: 'uuid' })
  agregadoId!: string;

  @Column({ name: 'tipo_evento', type: 'varchar', length: 100 })
  tipoEvento!: string;

  @Column({ name: 'datos', type: 'jsonb' })
  datos!: JsonValue;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 16,
    default: () => "'pendiente'",
  })
  estado!: string;

  @Column({ name: 'cantidad_reintentos', type: 'integer', default: () => '0' })
  cantidadReintentos!: number;

  @Column({ name: 'proximo_reintento_en', type: 'timestamptz', nullable: true })
  proximoReintentoEn!: Date | null;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;

  @Column({ name: 'entregado_en', type: 'timestamptz', nullable: true })
  entregadoEn!: Date | null;
}
