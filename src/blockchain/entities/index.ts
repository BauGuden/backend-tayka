/**
 * Inventario implementado: 8 tablas, 70 columnas; ninguna omitida frente al catalogo.
 * Cada export corresponde al archivo .entity.ts de la tabla indicada.
 * Sin entidades excluidas ni destinos FK pendientes.
 * CHECK, UNIQUE compuestos e indices parciales/de expresion: responsabilidad de PostgreSQL; documentados en cada entidad.
 * Validacion: yarn build y metadatos TypeORM correctos; cotejo con BD pendiente por autenticacion rechazada.
 * redes: 5 columnas; PK (id).
 * billeteras: 7 columnas; PK (id).
 *   FK red_id -> blockchain.redes (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK usuario_id -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK proveedor_id -> catalog.proveedores (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * activos: 8 columnas; PK (id).
 *   FK red_id -> blockchain.redes (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 * despliegues_contrato: 8 columnas; PK (id).
 *   FK red_id -> blockchain.redes (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 * transacciones: 10 columnas; PK (id).
 *   FK red_id -> blockchain.redes (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK billetera_origen_id -> blockchain.billeteras (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * operaciones_contrato: 17 columnas; PK (id).
 *   FK despliegue_id -> blockchain.despliegues_contrato (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK transaccion_id -> blockchain.transacciones (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK grupo_id -> commerce.grupos_compra (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK participante_id -> commerce.participantes_grupo (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK obligacion_pago_id -> finance.obligaciones_pago (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK transferencia_id -> finance.transferencias (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK reembolso_id -> finance.reembolsos (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK orden_compra_id -> commerce.ordenes_compra (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * eventos_contrato: 9 columnas; PK (id).
 *   FK transaccion_id -> blockchain.transacciones (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK despliegue_id -> blockchain.despliegues_contrato (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * cursores_indexador: 6 columnas; PK (id).
 *   FK red_id -> blockchain.redes (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 */
export { Red } from './redes.entity';
export { Billetera } from './billeteras.entity';
export { Activo } from './activos.entity';
export { DespliegueContrato } from './despliegues-contrato.entity';
export { Transaccion } from './transacciones.entity';
export { OperacionContrato } from './operaciones-contrato.entity';
export { EventoContrato } from './eventos-contrato.entity';
export { CursorIndexador } from './cursores-indexador.entity';
