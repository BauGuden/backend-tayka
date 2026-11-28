/**
 * Inventario implementado: 11 tablas, 116 columnas; ninguna omitida frente al catalogo.
 * Cada export corresponde al archivo .entity.ts de la tabla indicada.
 * Sin entidades excluidas ni destinos FK pendientes.
 * CHECK, UNIQUE compuestos e indices parciales/de expresion: responsabilidad de PostgreSQL; documentados en cada entidad.
 * Validacion: yarn build y metadatos TypeORM correctos; cotejo con BD pendiente por autenticacion rechazada.
 * ofertas: 20 columnas; PK (id).
 *   FK proveedor_id -> catalog.proveedores (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK variante_id -> catalog.variantes_producto (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK almacen_id -> catalog.almacenes (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK autorizado_por -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * versiones_oferta: 7 columnas; PK (id).
 *   FK oferta_id -> commerce.ofertas (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK creado_por -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * destinos_oferta: 6 columnas; PK (id).
 *   FK oferta_id -> commerce.ofertas (N:1); DELETE CASCADE, UPDATE NO ACTION.
 *   FK ciudad_id -> geography.ciudades (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 * grupos_compra: 18 columnas; PK (id).
 *   FK oferta_id -> commerce.ofertas (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK version_oferta_id -> commerce.versiones_oferta (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK abierto_por -> identity.usuarios (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 * participantes_grupo: 15 columnas; PK (id).
 *   FK grupo_id -> commerce.grupos_compra (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK usuario_id -> identity.usuarios (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK ciudad_destino_id -> geography.ciudades (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK version_condiciones_aceptada_id -> commerce.versiones_oferta (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 * lista_espera: 8 columnas; PK (id).
 *   FK grupo_id -> commerce.grupos_compra (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK usuario_id -> identity.usuarios (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 * eventos_grupo: 8 columnas; PK (id).
 *   FK grupo_id -> commerce.grupos_compra (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK usuario_actor_id -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * ordenes_compra: 14 columnas; PK (id).
 *   FK grupo_id -> commerce.grupos_compra (1:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK proveedor_id -> catalog.proveedores (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK emitido_por -> identity.usuarios (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 * detalles_orden_compra: 6 columnas; PK (id).
 *   FK orden_compra_id -> commerce.ordenes_compra (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK variante_id -> catalog.variantes_producto (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 * asignaciones_orden: 6 columnas; PK (id).
 *   FK orden_compra_id -> commerce.ordenes_compra (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK participante_id -> commerce.participantes_grupo (1:1); DELETE NO ACTION, UPDATE NO ACTION.
 * reservas_inventario: 8 columnas; PK (id).
 *   FK existencia_id -> catalog.existencias (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK grupo_id -> commerce.grupos_compra (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK orden_compra_id -> commerce.ordenes_compra (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 */
export { Oferta } from './ofertas.entity';
export { VersionOferta } from './versiones-oferta.entity';
export { DestinoOferta } from './destinos-oferta.entity';
export { GrupoCompra } from './grupos-compra.entity';
export { ParticipanteGrupo } from './participantes-grupo.entity';
export { ListaEspera } from './lista-espera.entity';
export { EventoGrupo } from './eventos-grupo.entity';
export { OrdenCompra } from './ordenes-compra.entity';
export { DetalleOrdenCompra } from './detalles-orden-compra.entity';
export { AsignacionOrden } from './asignaciones-orden.entity';
export { ReservaInventario } from './reservas-inventario.entity';
