import { Entity, PrimaryColumn, Column } from 'typeorm';

type JsonValue =
  string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Contrato: catalogo SQL proporcionado; pendiente de cotejo con la BD (autenticacion rechazada).
 * Sin sincronizacion de esquema. Restricciones e indices administrados por PostgreSQL.
 * UNIQUE(origen, evento_externo_id)
 * estado_procesamiento: CHECK(estado_procesamiento IN ('recibido','procesado','ignorado','fallido'))
 * PK UUID: se conserva DEFAULT gen_random_uuid() explicito; PostgreSQL genera el valor.
 */
@Entity({
  schema: 'operations',
  name: 'webhooks_entrantes',
  synchronize: false,
})
export class WebhookEntrante {
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id!: string;

  @Column({ name: 'origen', type: 'varchar', length: 80 })
  origen!: string;

  @Column({ name: 'evento_externo_id', type: 'varchar', length: 180 })
  eventoExternoId!: string;

  @Column({ name: 'firma_verificada', type: 'boolean', default: () => 'false' })
  firmaVerificada!: boolean;

  @Column({ name: 'datos', type: 'jsonb' })
  datos!: JsonValue;

  @Column({
    name: 'estado_procesamiento',
    type: 'varchar',
    length: 18,
    default: () => "'recibido'",
  })
  estadoProcesamiento!: string;

  @Column({ name: 'recibido_en', type: 'timestamptz', default: () => 'now()' })
  recibidoEn!: Date;

  @Column({ name: 'procesado_en', type: 'timestamptz', nullable: true })
  procesadoEn!: Date | null;
}
