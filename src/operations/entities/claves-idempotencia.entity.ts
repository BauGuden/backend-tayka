import { Entity, PrimaryColumn, Column } from 'typeorm';

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * UNIQUE(espacio_claves,clave_idempotencia)
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({
  schema: 'operations',
  name: 'claves_idempotencia',
  synchronize: false,
})
export class ClaveIdempotencia {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'espacio_claves', type: 'varchar', length: 80 })
  espacioClaves!: string;

  @Column({ name: 'clave_idempotencia', type: 'varchar', length: 180 })
  claveIdempotencia!: string;

  @Column({ name: 'hash_solicitud', type: 'varchar', length: 128 })
  hashSolicitud!: string;

  @Column({ name: 'codigo_respuesta', type: 'integer', nullable: true })
  codigoRespuesta!: number | null;

  @Column({ name: 'contenido_respuesta', type: 'jsonb', nullable: true })
  contenidoRespuesta!: JsonValue | null;

  @Column({ name: 'vence_en', type: 'timestamptz' })
  venceEn!: Date;

  @Column({ name: 'creado_en', type: 'timestamptz', default: () => 'now()' })
  creadoEn!: Date;
}
