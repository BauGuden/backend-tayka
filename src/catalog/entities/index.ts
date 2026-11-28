/**
 * Inventario implementado: 10 tablas, 87 columnas; ninguna omitida frente al catalogo.
 * Cada export corresponde al archivo .entity.ts de la tabla indicada.
 * Sin entidades excluidas ni destinos FK pendientes.
 * CHECK, UNIQUE compuestos e indices parciales/de expresion: responsabilidad de PostgreSQL; documentados en cada entidad.
 * Validacion: yarn build y metadatos TypeORM correctos; cotejo con BD pendiente por autenticacion rechazada.
 * proveedores: 17 columnas; PK (id).
 *   FK ciudad_id -> geography.ciudades (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK verificado_por -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * usuarios_proveedor: 5 columnas; PK (proveedor_id, usuario_id).
 *   FK proveedor_id -> catalog.proveedores (N:1); DELETE CASCADE, UPDATE NO ACTION.
 *   FK usuario_id -> identity.usuarios (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 * categorias: 6 columnas; PK (id).
 *   FK padre_id -> catalog.categorias (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * marcas: 3 columnas; PK (id).
 * productos: 15 columnas; PK (id).
 *   FK categoria_id -> catalog.categorias (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK marca_id -> catalog.marcas (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK creado_por -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * variantes_producto: 12 columnas; PK (id).
 *   FK producto_id -> catalog.productos (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 * archivos_producto: 8 columnas; PK (id).
 *   FK producto_id -> catalog.productos (N:1); DELETE CASCADE, UPDATE NO ACTION.
 *   FK variante_id -> catalog.variantes_producto (N:1, opcional); DELETE SET NULL, UPDATE NO ACTION.
 * almacenes: 7 columnas; PK (id).
 *   FK proveedor_id -> catalog.proveedores (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK ciudad_id -> geography.ciudades (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * existencias: 6 columnas; PK (id).
 *   FK almacen_id -> catalog.almacenes (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK variante_id -> catalog.variantes_producto (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 * movimientos_inventario: 8 columnas; PK (id).
 *   FK existencia_id -> catalog.existencias (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK usuario_actor_id -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 */
export { Proveedor } from './proveedores.entity';
export { UsuarioProveedor } from './usuarios-proveedor.entity';
export { Categoria } from './categorias.entity';
export { Marca } from './marcas.entity';
export { Producto } from './productos.entity';
export { VarianteProducto } from './variantes-producto.entity';
export { ArchivoProducto } from './archivos-producto.entity';
export { Almacen } from './almacenes.entity';
export { Existencia } from './existencias.entity';
export { MovimientoInventario } from './movimientos-inventario.entity';
