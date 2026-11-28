/**
 * Inventario implementado: 5 tablas, 44 columnas; ninguna omitida frente al catalogo.
 * Cada export corresponde al archivo .entity.ts de la tabla indicada.
 * Sin entidades excluidas ni destinos FK pendientes.
 * CHECK, UNIQUE compuestos e indices parciales/de expresion: responsabilidad de PostgreSQL; documentados en cada entidad.
 * Validacion: yarn build y metadatos TypeORM correctos; cotejo con BD pendiente por autenticacion rechazada.
 * puntos_retiro: 10 columnas; PK (id).
 *   FK usuario_operador_id -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK ciudad_id -> geography.ciudades (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 * transportistas: 6 columnas; PK (id).
 * entregas: 14 columnas; PK (id).
 *   FK asignacion_orden_id -> commerce.asignaciones_orden (1:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK punto_retiro_id -> logistics.puntos_retiro (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK transportista_id -> logistics.transportistas (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * codigos_retiro: 7 columnas; PK (id).
 *   FK entrega_id -> logistics.entregas (1:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK canjeado_por -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * eventos_entrega: 7 columnas; PK (id).
 *   FK entrega_id -> logistics.entregas (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK usuario_actor_id -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 */
export { PuntoRetiro } from './puntos-retiro.entity';
export { Transportista } from './transportistas.entity';
export { Entrega } from './entregas.entity';
export { CodigoRetiro } from './codigos-retiro.entity';
export { EventoEntrega } from './eventos-entrega.entity';
