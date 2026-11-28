/**
 * Inventario implementado: 6 tablas, 68 columnas; ninguna omitida frente al catalogo.
 * Cada export corresponde al archivo .entity.ts de la tabla indicada.
 * Sin entidades excluidas ni destinos FK pendientes.
 * CHECK, UNIQUE compuestos e indices parciales/de expresion: responsabilidad de PostgreSQL; documentados en cada entidad.
 * Validacion: yarn build y metadatos TypeORM correctos; cotejo con BD pendiente por autenticacion rechazada.
 * medios_pago: 8 columnas; PK (id).
 * obligaciones_pago: 11 columnas; PK (id).
 *   FK participante_grupo_id -> commerce.participantes_grupo (1:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK medio_pago_id -> finance.medios_pago (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * reembolsos: 11 columnas; PK (id).
 *   FK obligacion_pago_id -> finance.obligaciones_pago (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK solicitado_por -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK aprobado_por -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * liquidaciones_proveedor: 9 columnas; PK (id).
 *   FK orden_compra_id -> commerce.ordenes_compra (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK proveedor_id -> catalog.proveedores (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK aprobado_por -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * transferencias: 20 columnas; PK (id).
 *   FK medio_pago_id -> finance.medios_pago (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK obligacion_pago_id -> finance.obligaciones_pago (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK reembolso_id -> finance.reembolsos (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK liquidacion_proveedor_id -> finance.liquidaciones_proveedor (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK iniciado_por -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * conciliaciones: 9 columnas; PK (id).
 *   FK transferencia_id -> finance.transferencias (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK verificado_por -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 */
export { MedioPago } from './medios-pago.entity';
export { ObligacionPago } from './obligaciones-pago.entity';
export { Reembolso } from './reembolsos.entity';
export { LiquidacionProveedor } from './liquidaciones-proveedor.entity';
export { Transferencia } from './transferencias.entity';
export { Conciliacion } from './conciliaciones.entity';
