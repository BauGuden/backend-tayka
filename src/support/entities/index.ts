/**
 * Inventario implementado: 4 tablas, 35 columnas; ninguna omitida frente al catalogo.
 * Cada export corresponde al archivo .entity.ts de la tabla indicada.
 * Sin entidades excluidas ni destinos FK pendientes.
 * CHECK, UNIQUE compuestos e indices parciales/de expresion: responsabilidad de PostgreSQL; documentados en cada entidad.
 * Validacion: yarn build y metadatos TypeORM correctos; cotejo con BD pendiente por autenticacion rechazada.
 * casos_soporte: 12 columnas; PK (id).
 *   FK usuario_creador_id -> identity.usuarios (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK usuario_asignado_id -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK grupo_id -> commerce.grupos_compra (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK obligacion_pago_id -> finance.obligaciones_pago (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * mensajes_soporte: 7 columnas; PK (id).
 *   FK caso_soporte_id -> support.casos_soporte (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK usuario_autor_id -> identity.usuarios (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 * notificaciones: 10 columnas; PK (id).
 *   FK usuario_id -> identity.usuarios (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 * preferencias_notificacion: 6 columnas; PK (usuario_id, tipo_notificacion).
 *   FK usuario_id -> identity.usuarios (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 */
export { CasoSoporte } from './casos-soporte.entity';
export { MensajeSoporte } from './mensajes-soporte.entity';
export { Notificacion } from './notificaciones.entity';
export { PreferenciaNotificacion } from './preferencias-notificacion.entity';
