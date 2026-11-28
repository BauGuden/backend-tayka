/**
 * Inventario implementado: 5 tablas, 39 columnas; ninguna omitida frente al catalogo.
 * Cada export corresponde al archivo .entity.ts de la tabla indicada.
 * Sin entidades excluidas ni destinos FK pendientes.
 * CHECK, UNIQUE compuestos e indices parciales/de expresion: responsabilidad de PostgreSQL; documentados en cada entidad.
 * Validacion: yarn build y metadatos TypeORM correctos; cotejo con BD pendiente por autenticacion rechazada.
 * comentarios: 11 columnas; PK (id).
 *   FK usuario_autor_id -> identity.usuarios (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK producto_id -> catalog.productos (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK oferta_id -> commerce.ofertas (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK grupo_id -> commerce.grupos_compra (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK comentario_padre_id -> community.comentarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * resenas: 11 columnas; PK (id).
 *   FK usuario_autor_id -> identity.usuarios (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK participante_grupo_id -> commerce.participantes_grupo (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK producto_id -> catalog.productos (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK proveedor_id -> catalog.proveedores (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * reacciones: 4 columnas; PK (usuario_id, comentario_id).
 *   FK usuario_id -> identity.usuarios (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK comentario_id -> community.comentarios (N:1); DELETE CASCADE, UPDATE NO ACTION.
 * favoritos: 3 columnas; PK (usuario_id, producto_id).
 *   FK usuario_id -> identity.usuarios (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK producto_id -> catalog.productos (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 * reportes: 10 columnas; PK (id).
 *   FK usuario_denunciante_id -> identity.usuarios (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK comentario_id -> community.comentarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK resena_id -> community.resenas (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK resuelto_por -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 */
export { Comentario } from './comentarios.entity';
export { Resena } from './resenas.entity';
export { Reaccion } from './reacciones.entity';
export { Favorito } from './favoritos.entity';
export { Reporte } from './reportes.entity';
