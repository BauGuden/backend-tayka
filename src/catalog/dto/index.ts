/**
 * Cobertura: todas las entidades de catalog revisadas contra sus archivos reales y el Anexo A.
 * BD: autenticacion rechazada; no se pudo cotejar el esquema desplegado. Sin SQL de escritura.
 * Servicios/controladores actuales: scaffolding. Estos contratos requieren integracion y autorizacion en consumidores fuera de alcance.
 * DTOs genericos heredados conservados sin cambios por sus imports actuales; no representan CRUD implementado.
 * No se modifica ninguna PK en Update. No se reciben actores autenticados, estados internos, secretos ni montos derivados.
 * UNIQUE, FK, permisos y reglas que necesitan estado persistido se comprueban en servicio/BD.
 * Validacion HTTP pendiente en consumidores: whitelist y forbidNonWhitelisted; los DTOs por si solos no rechazan claves extra.
 * Inventario por entidad: columnas totales, Create/Update, campos permitidos y campos excluidos con motivo.
 *
 * catalog.proveedores (Proveedor): 17 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); razonSocial -> razon_social varchar(220) NOT NULL; nombreComercial -> nombre_comercial varchar(220) NULL; nitCifrado -> nit_cifrado bytea NULL; ultimos4Nit -> ultimos4_nit varchar(4) NULL; descripcion -> descripcion text NULL; correoContacto -> correo_contacto varchar(254) NULL; telefonoContacto -> telefono_contacto varchar(40) NULL; urlSitio -> url_sitio text NULL; ciudadId -> ciudad_id uuid NULL; direccion -> direccion text NULL; estado -> estado varchar(24) NOT NULL DEFAULT 'pendiente'; verificadoPor -> verificado_por uuid NULL; verificadoEn -> verificado_en timestamptz NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now(); eliminadoEn -> eliminado_en timestamptz NULL.
 * Create: create-proveedor.dto.ts; permitidos: razonSocial, nombreComercial, descripcion, correoContacto, telefonoContacto, urlSitio, ciudadId, direccion.
 * Update: update-proveedor.dto.ts; permitidos: razonSocial, nombreComercial, descripcion, correoContacto, telefonoContacto, urlSitio, direccion.
 * Contexto: Datos comerciales; cifrado, ultimos4Nit, verificacion y ciclo de vida son del servidor.
 * Excluidos en Create: id (PK generada o identidad de asociacion); nitCifrado (dato sensible o derivado de fuente verificada); ultimos4Nit (dato sensible o derivado de fuente verificada); estado (ciclo de vida o habilitacion mediante comando); verificadoPor (contexto autenticado o comando autorizado); verificadoEn (marca del servidor); creadoEn (marca del servidor); actualizadoEn (marca del servidor); eliminadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); nitCifrado (dato sensible o derivado de fuente verificada); ultimos4Nit (dato sensible o derivado de fuente verificada); ciudadId (identidad/referencia inmutable o comando separado); estado (ciclo de vida o habilitacion mediante comando); verificadoPor (contexto autenticado o comando autorizado); verificadoEn (marca del servidor); creadoEn (marca del servidor); actualizadoEn (marca del servidor); eliminadoEn (marca del servidor).
 *
 * catalog.almacenes (Almacen): 7 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); proveedorId -> proveedor_id uuid NOT NULL; ciudadId -> ciudad_id uuid NULL; nombre -> nombre varchar(160) NOT NULL; direccion -> direccion text NULL; estaActivo -> esta_activo boolean NOT NULL DEFAULT true; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-almacen.dto.ts; permitidos: proveedorId, ciudadId, nombre, direccion.
 * Update: update-almacen.dto.ts; permitidos: nombre, direccion.
 * Contexto: Administracion autorizada; pertenencia del proveedor/ciudad en servicio, no actor autenticado.
 * Excluidos en Create: id (PK generada o identidad de asociacion); estaActivo (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); proveedorId (identidad/referencia inmutable o comando separado); ciudadId (identidad/referencia inmutable o comando separado); estaActivo (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor).
 *
 * catalog.categorias (Categoria): 6 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); padreId -> padre_id uuid NULL; nombre -> nombre varchar(120) NOT NULL; identificadorUrl -> identificador_url varchar(140) NOT NULL; descripcion -> descripcion text NULL; estaActivo -> esta_activo boolean NOT NULL DEFAULT true.
 * Create: create-categoria.dto.ts; permitidos: padreId, nombre, identificadorUrl, descripcion.
 * Update: update-categoria.dto.ts; permitidos: nombre, identificadorUrl, descripcion.
 * Contexto: Metadatos administrativos; requiere autorizacion del consumidor.
 * Excluidos en Create: id (PK generada o identidad de asociacion); estaActivo (ciclo de vida o habilitacion mediante comando).
 * Excluidos en Update: id (PK generada o identidad de asociacion); padreId (identidad/referencia inmutable o comando separado); estaActivo (ciclo de vida o habilitacion mediante comando).
 *
 * catalog.marcas (Marca): 3 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); nombre -> nombre varchar(120) NOT NULL; estaActivo -> esta_activo boolean NOT NULL DEFAULT true.
 * Create: create-marca.dto.ts; permitidos: nombre.
 * Update: update-marca.dto.ts; permitidos: nombre.
 * Contexto: Metadatos administrativos; requiere autorizacion del consumidor.
 * Excluidos en Create: id (PK generada o identidad de asociacion); estaActivo (ciclo de vida o habilitacion mediante comando).
 * Excluidos en Update: id (PK generada o identidad de asociacion); estaActivo (ciclo de vida o habilitacion mediante comando).
 *
 * catalog.productos (Producto): 15 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); categoriaId -> categoria_id uuid NOT NULL; marcaId -> marca_id uuid NULL; nombre -> nombre varchar(220) NOT NULL; identificadorUrl -> identificador_url varchar(260) NOT NULL; descripcion -> descripcion text NULL; especificaciones -> especificaciones jsonb NOT NULL DEFAULT '{}'::jsonb; descripcionGarantia -> descripcion_garantia text NULL; esPerecedero -> es_perecedero boolean NOT NULL DEFAULT false; esRegulado -> es_regulado boolean NOT NULL DEFAULT false; estado -> estado varchar(20) NOT NULL DEFAULT 'borrador'; creadoPor -> creado_por uuid NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now(); eliminadoEn -> eliminado_en timestamptz NULL.
 * Create: create-producto.dto.ts; permitidos: categoriaId, marcaId, nombre, identificadorUrl, descripcion, descripcionGarantia, esPerecedero, esRegulado.
 * Update: update-producto.dto.ts; permitidos: nombre, identificadorUrl, descripcion, descripcionGarantia, esPerecedero, esRegulado.
 * Contexto: Metadatos administrativos; requiere autorizacion del consumidor.
 * Excluidos en Create: id (PK generada o identidad de asociacion); especificaciones (esquema semantico JSON no definido); estado (ciclo de vida o habilitacion mediante comando); creadoPor (contexto autenticado o comando autorizado); creadoEn (marca del servidor); actualizadoEn (marca del servidor); eliminadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); categoriaId (identidad/referencia inmutable o comando separado); marcaId (identidad/referencia inmutable o comando separado); especificaciones (esquema semantico JSON no definido); estado (ciclo de vida o habilitacion mediante comando); creadoPor (contexto autenticado o comando autorizado); creadoEn (marca del servidor); actualizadoEn (marca del servidor); eliminadoEn (marca del servidor).
 *
 * catalog.variantes_producto (VarianteProducto): 12 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); productoId -> producto_id uuid NOT NULL; sku -> sku varchar(100) NOT NULL; nombre -> nombre varchar(180) NOT NULL; codigoBarras -> codigo_barras varchar(80) NULL; unidad -> unidad varchar(24) NOT NULL; unidadesPorPaquete -> unidades_por_paquete numeric(16,3) NOT NULL DEFAULT 1; pesoGramos -> peso_gramos numeric(14,3) NULL; atributos -> atributos jsonb NOT NULL DEFAULT '{}'::jsonb; estaActivo -> esta_activo boolean NOT NULL DEFAULT true; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-variante-producto.dto.ts; permitidos: productoId, sku, nombre, codigoBarras, unidad, unidadesPorPaquete, pesoGramos.
 * Update: update-variante-producto.dto.ts; permitidos: sku, nombre, codigoBarras, unidad, unidadesPorPaquete, pesoGramos.
 * Contexto: Metadatos administrativos; requiere autorizacion del consumidor.
 * Excluidos en Create: id (PK generada o identidad de asociacion); atributos (esquema semantico JSON no definido); estaActivo (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor); actualizadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); productoId (identidad/referencia inmutable o comando separado); atributos (esquema semantico JSON no definido); estaActivo (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor); actualizadoEn (marca del servidor).
 *
 * catalog.archivos_producto (ArchivoProducto): 8 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); productoId -> producto_id uuid NOT NULL; varianteId -> variante_id uuid NULL; urlArchivo -> url_archivo text NOT NULL; textoAlternativo -> texto_alternativo varchar(250) NULL; tipoArchivo -> tipo_archivo varchar(15) NOT NULL DEFAULT 'imagen'; ordenVisualizacion -> orden_visualizacion integer NOT NULL DEFAULT 0; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-archivo-producto.dto.ts; permitidos: productoId, varianteId, urlArchivo, textoAlternativo, tipoArchivo, ordenVisualizacion.
 * Update: update-archivo-producto.dto.ts; permitidos: urlArchivo, textoAlternativo, tipoArchivo, ordenVisualizacion.
 * Contexto: Metadatos administrativos; requiere autorizacion del consumidor.
 * Excluidos en Create: id (PK generada o identidad de asociacion); creadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); productoId (identidad/referencia inmutable o comando separado); varianteId (identidad/referencia inmutable o comando separado); creadoEn (marca del servidor).
 *
 * catalog.existencias (Existencia): 6 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); almacenId -> almacen_id uuid NOT NULL; varianteId -> variante_id uuid NOT NULL; cantidadExistente -> cantidad_existente numeric(16,3) NOT NULL DEFAULT 0; cantidadReservada -> cantidad_reservada numeric(16,3) NOT NULL DEFAULT 0; actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Inventario transaccional; cantidades y reservas no son input publico.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * catalog.movimientos_inventario (MovimientoInventario): 8 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); existenciaId -> existencia_id uuid NOT NULL; usuarioActorId -> usuario_actor_id uuid NULL; tipoMovimiento -> tipo_movimiento varchar(25) NOT NULL; variacionCantidad -> variacion_cantidad numeric(16,3) NOT NULL; motivo -> motivo text NULL; referenciaExterna -> referencia_externa varchar(120) NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Movimiento auditable interno; falta comando de inventario.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * catalog.usuarios_proveedor (UsuarioProveedor): 5 columnas revisadas; PK proveedorId, usuarioId.
 * Columnas totales: proveedorId -> proveedor_id uuid NOT NULL; usuarioId -> usuario_id uuid NOT NULL; rolIntegrante -> rol_integrante varchar(24) NOT NULL; estaActivo -> esta_activo boolean NOT NULL DEFAULT true; agregadoEn -> agregado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Gestion de integrantes/roles del proveedor sin comando autorizado.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 */
export { CreateProveedorDto } from './create-proveedor.dto';
export { UpdateProveedorDto } from './update-proveedor.dto';
export { CreateAlmacenDto } from './create-almacen.dto';
export { UpdateAlmacenDto } from './update-almacen.dto';
export { CreateCategoriaDto } from './create-categoria.dto';
export { UpdateCategoriaDto } from './update-categoria.dto';
export { CreateMarcaDto } from './create-marca.dto';
export { UpdateMarcaDto } from './update-marca.dto';
export { CreateProductoDto } from './create-producto.dto';
export { UpdateProductoDto } from './update-producto.dto';
export { CreateVarianteProductoDto } from './create-variante-producto.dto';
export { UpdateVarianteProductoDto } from './update-variante-producto.dto';
export { CreateArchivoProductoDto } from './create-archivo-producto.dto';
export { UpdateArchivoProductoDto } from './update-archivo-producto.dto';
