/**
 * Cobertura: todas las entidades de community revisadas contra sus archivos reales y el Anexo A.
 * BD: autenticacion rechazada; no se pudo cotejar el esquema desplegado. Sin SQL de escritura.
 * Servicios/controladores actuales: scaffolding. Estos contratos requieren integracion y autorizacion en consumidores fuera de alcance.
 * DTOs genericos heredados conservados sin cambios por sus imports actuales; no representan CRUD implementado.
 * No se modifica ninguna PK en Update. No se reciben actores autenticados, estados internos, secretos ni montos derivados.
 * UNIQUE, FK, permisos y reglas que necesitan estado persistido se comprueban en servicio/BD.
 * Validacion HTTP pendiente en consumidores: whitelist y forbidNonWhitelisted; los DTOs por si solos no rechazan claves extra.
 * Inventario por entidad: columnas totales, Create/Update, campos permitidos y campos excluidos con motivo.
 *
 * community.comentarios (Comentario): 11 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); usuarioAutorId -> usuario_autor_id uuid NOT NULL; productoId -> producto_id uuid NULL; ofertaId -> oferta_id uuid NULL; grupoId -> grupo_id uuid NULL; comentarioPadreId -> comentario_padre_id uuid NULL; contenido -> contenido text NOT NULL; estado -> estado varchar(22) NOT NULL DEFAULT 'visible'; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now(); eliminadoEn -> eliminado_en timestamptz NULL.
 * Create: create-comentario.dto.ts; permitidos: productoId, ofertaId, grupoId, comentarioPadreId, contenido.
 * Update: update-comentario.dto.ts; permitidos: contenido.
 * Contexto: Contenido propio; autor del contexto. Destino unico y padre autorizado; moderacion interna.
 * Excluidos en Create: id (PK generada o identidad de asociacion); usuarioAutorId (contexto autenticado o comando autorizado); estado (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor); actualizadoEn (marca del servidor); eliminadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); usuarioAutorId (contexto autenticado o comando autorizado); productoId (identidad/referencia inmutable o comando separado); ofertaId (identidad/referencia inmutable o comando separado); grupoId (identidad/referencia inmutable o comando separado); comentarioPadreId (identidad/referencia inmutable o comando separado); estado (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor); actualizadoEn (marca del servidor); eliminadoEn (marca del servidor).
 *
 * community.favoritos (Favorito): 3 columnas revisadas; PK usuarioId, productoId.
 * Columnas totales: usuarioId -> usuario_id uuid NOT NULL; productoId -> producto_id uuid NOT NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-favorito.dto.ts; permitidos: productoId.
 * Update: omitido; Usuario del contexto; sin campos mutables. Quitar favorito requiere accion de desasociacion..
 * Contexto: Usuario del contexto; sin campos mutables. Quitar favorito requiere accion de desasociacion.
 * Excluidos en Create: usuarioId (PK generada o identidad de asociacion); creadoEn (marca del servidor).
 * Excluidos en Update: usuarioId (PK generada o identidad de asociacion); productoId (identidad/referencia inmutable o comando separado); creadoEn (marca del servidor).
 *
 * community.reacciones (Reaccion): 4 columnas revisadas; PK usuarioId, comentarioId.
 * Columnas totales: usuarioId -> usuario_id uuid NOT NULL; comentarioId -> comentario_id uuid NOT NULL; reaccion -> reaccion varchar(16) NOT NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-reaccion.dto.ts; permitidos: comentarioId, reaccion.
 * Update: update-reaccion.dto.ts; permitidos: reaccion.
 * Contexto: Usuario del contexto; Update no contiene ninguna parte de la PK compuesta.
 * Excluidos en Create: usuarioId (PK generada o identidad de asociacion); creadoEn (marca del servidor).
 * Excluidos en Update: usuarioId (PK generada o identidad de asociacion); comentarioId (identidad/referencia inmutable o comando separado); creadoEn (marca del servidor).
 *
 * community.resenas (Resena): 11 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); usuarioAutorId -> usuario_autor_id uuid NOT NULL; participanteGrupoId -> participante_grupo_id uuid NOT NULL; productoId -> producto_id uuid NULL; proveedorId -> proveedor_id uuid NULL; calificacion -> calificacion smallint NOT NULL; titulo -> titulo varchar(180) NULL; contenido -> contenido text NULL; estado -> estado varchar(20) NOT NULL DEFAULT 'visible'; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-resena.dto.ts; permitidos: participanteGrupoId, productoId, proveedorId, calificacion, titulo, contenido.
 * Update: update-resena.dto.ts; permitidos: calificacion, titulo, contenido.
 * Contexto: Autor del contexto; compra, pertenencia y elegibilidad en servicio.
 * Excluidos en Create: id (PK generada o identidad de asociacion); usuarioAutorId (contexto autenticado o comando autorizado); estado (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor); actualizadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); usuarioAutorId (contexto autenticado o comando autorizado); participanteGrupoId (identidad/referencia inmutable o comando separado); productoId (identidad/referencia inmutable o comando separado); proveedorId (identidad/referencia inmutable o comando separado); estado (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor); actualizadoEn (marca del servidor).
 *
 * community.reportes (Reporte): 10 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); usuarioDenuncianteId -> usuario_denunciante_id uuid NOT NULL; comentarioId -> comentario_id uuid NULL; resenaId -> resena_id uuid NULL; motivo -> motivo varchar(80) NOT NULL; detalles -> detalles text NULL; estado -> estado varchar(20) NOT NULL DEFAULT 'abierto'; resueltoPor -> resuelto_por uuid NULL; resueltoEn -> resuelto_en timestamptz NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-reporte.dto.ts; permitidos: comentarioId, resenaId, motivo, detalles.
 * Update: omitido; Denuncia propia; actor del contexto, resolucion y moderacion internas..
 * Contexto: Denuncia propia; actor del contexto, resolucion y moderacion internas.
 * Excluidos en Create: id (PK generada o identidad de asociacion); usuarioDenuncianteId (contexto autenticado o comando autorizado); estado (ciclo de vida o habilitacion mediante comando); resueltoPor (operacion especifica pendiente; no aceptado en este contrato); resueltoEn (marca del servidor); creadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); usuarioDenuncianteId (contexto autenticado o comando autorizado); comentarioId (identidad/referencia inmutable o comando separado); resenaId (identidad/referencia inmutable o comando separado); motivo (identidad/referencia inmutable o comando separado); detalles (identidad/referencia inmutable o comando separado); estado (ciclo de vida o habilitacion mediante comando); resueltoPor (operacion especifica pendiente; no aceptado en este contrato); resueltoEn (marca del servidor); creadoEn (marca del servidor).
 */
export { CreateComentarioDto } from './create-comentario.dto';
export { UpdateComentarioDto } from './update-comentario.dto';
export { CreateFavoritoDto } from './create-favorito.dto';
export { CreateReaccionDto } from './create-reaccion.dto';
export { UpdateReaccionDto } from './update-reaccion.dto';
export { CreateResenaDto } from './create-resena.dto';
export { UpdateResenaDto } from './update-resena.dto';
export { CreateReporteDto } from './create-reporte.dto';
