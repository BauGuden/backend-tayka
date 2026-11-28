/**
 * Inventario implementado: 4 tablas, 36 columnas; ninguna omitida frente al catalogo.
 * Cada export corresponde al archivo .entity.ts de la tabla indicada.
 * Sin entidades excluidas ni destinos FK pendientes.
 * CHECK, UNIQUE compuestos e indices parciales/de expresion: responsabilidad de PostgreSQL; documentados en cada entidad.
 * Validacion: yarn build y metadatos TypeORM correctos; cotejo con BD pendiente por autenticacion rechazada.
 * registros_auditoria: 10 columnas; PK (id).
 *   FK usuario_actor_id -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * eventos_salida: 10 columnas; PK (id).
 * claves_idempotencia: 8 columnas; PK (id).
 * webhooks_entrantes: 8 columnas; PK (id).
 */
export { RegistroAuditoria } from './registros-auditoria.entity';
export { EventoSalida } from './eventos-salida.entity';
export { ClaveIdempotencia } from './claves-idempotencia.entity';
export { WebhookEntrante } from './webhooks-entrantes.entity';
