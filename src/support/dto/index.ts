/**
 * Cobertura: todas las entidades de support revisadas contra sus archivos reales y el Anexo A.
 * BD: autenticacion rechazada; no se pudo cotejar el esquema desplegado. Sin SQL de escritura.
 * Servicios/controladores actuales: scaffolding. Estos contratos requieren integracion y autorizacion en consumidores fuera de alcance.
 * DTOs genericos heredados conservados sin cambios por sus imports actuales; no representan CRUD implementado.
 * No se modifica ninguna PK en Update. No se reciben actores autenticados, estados internos, secretos ni montos derivados.
 * UNIQUE, FK, permisos y reglas que necesitan estado persistido se comprueban en servicio/BD.
 * Validacion HTTP pendiente en consumidores: whitelist y forbidNonWhitelisted; los DTOs por si solos no rechazan claves extra.
 * Inventario por entidad: columnas totales, Create/Update, campos permitidos y campos excluidos con motivo.
 *
 * support.casos_soporte (CasoSoporte): 12 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); usuarioCreadorId -> usuario_creador_id uuid NOT NULL; usuarioAsignadoId -> usuario_asignado_id uuid NULL; grupoId -> grupo_id uuid NULL; obligacionPagoId -> obligacion_pago_id uuid NULL; asunto -> asunto varchar(220) NOT NULL; categoria -> categoria varchar(40) NOT NULL; prioridad -> prioridad varchar(12) NOT NULL DEFAULT 'normal'; estado -> estado varchar(20) NOT NULL DEFAULT 'abierto'; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now(); cerradoEn -> cerrado_en timestamptz NULL.
 * Create: create-caso-soporte.dto.ts; permitidos: grupoId, obligacionPagoId, asunto, categoria.
 * Update: update-caso-soporte.dto.ts; permitidos: asunto, categoria.
 * Contexto: Solicitud propia; autor, asignacion, prioridad y estado del servidor. Acceso a referencias en servicio.
 * Excluidos en Create: id (PK generada o identidad de asociacion); usuarioCreadorId (contexto autenticado o comando autorizado); usuarioAsignadoId (contexto autenticado o comando autorizado); prioridad (operacion especifica pendiente; no aceptado en este contrato); estado (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor); actualizadoEn (marca del servidor); cerradoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); usuarioCreadorId (contexto autenticado o comando autorizado); usuarioAsignadoId (contexto autenticado o comando autorizado); grupoId (identidad/referencia inmutable o comando separado); obligacionPagoId (identidad/referencia inmutable o comando separado); prioridad (operacion especifica pendiente; no aceptado en este contrato); estado (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor); actualizadoEn (marca del servidor); cerradoEn (marca del servidor).
 *
 * support.mensajes_soporte (MensajeSoporte): 7 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); casoSoporteId -> caso_soporte_id uuid NOT NULL; usuarioAutorId -> usuario_autor_id uuid NOT NULL; contenido -> contenido text NOT NULL; urlAdjunto -> url_adjunto text NULL; esNotaInterna -> es_nota_interna boolean NOT NULL DEFAULT false; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-mensaje-soporte.dto.ts; permitidos: casoSoporteId, contenido, urlAdjunto.
 * Update: omitido; Mensaje propio; autor del contexto, nota interna requiere comando con rol. Historial sin Update generico..
 * Contexto: Mensaje propio; autor del contexto, nota interna requiere comando con rol. Historial sin Update generico.
 * Excluidos en Create: id (PK generada o identidad de asociacion); usuarioAutorId (contexto autenticado o comando autorizado); esNotaInterna (operacion especifica pendiente; no aceptado en este contrato); creadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); casoSoporteId (identidad/referencia inmutable o comando separado); usuarioAutorId (contexto autenticado o comando autorizado); contenido (identidad/referencia inmutable o comando separado); urlAdjunto (identidad/referencia inmutable o comando separado); esNotaInterna (operacion especifica pendiente; no aceptado en este contrato); creadoEn (marca del servidor).
 *
 * support.notificaciones (Notificacion): 10 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); usuarioId -> usuario_id uuid NOT NULL; canal -> canal varchar(14) NOT NULL; titulo -> titulo varchar(200) NOT NULL; contenido -> contenido text NULL; datos -> datos jsonb NOT NULL DEFAULT '{}'::jsonb; estado -> estado varchar(14) NOT NULL DEFAULT 'en_cola'; leidoEn -> leido_en timestamptz NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); enviadoEn -> enviado_en timestamptz NULL.
 * Create omitido; Update omitido. Motivo: Emision/entrega interna; lectura requiere accion separada.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * support.preferencias_notificacion (PreferenciaNotificacion): 6 columnas revisadas; PK usuarioId, tipoNotificacion.
 * Columnas totales: usuarioId -> usuario_id uuid NOT NULL; tipoNotificacion -> tipo_notificacion varchar(70) NOT NULL; permiteCorreo -> permite_correo boolean NOT NULL DEFAULT true; permitePush -> permite_push boolean NOT NULL DEFAULT true; permiteSms -> permite_sms boolean NOT NULL DEFAULT false; actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-preferencia-notificacion.dto.ts; permitidos: tipoNotificacion, permiteCorreo, permitePush, permiteSms.
 * Update: update-preferencia-notificacion.dto.ts; permitidos: permiteCorreo, permitePush, permiteSms.
 * Contexto: Usuario autenticado implicito; Update no permite alterar tipoNotificacion ni usuarioId (PK compuesta).
 * Excluidos en Create: usuarioId (PK generada o identidad de asociacion); actualizadoEn (marca del servidor).
 * Excluidos en Update: usuarioId (PK generada o identidad de asociacion); tipoNotificacion (identidad/referencia inmutable o comando separado); actualizadoEn (marca del servidor).
 */
export { CreateCasoSoporteDto } from './create-caso-soporte.dto';
export { UpdateCasoSoporteDto } from './update-caso-soporte.dto';
export { CreateMensajeSoporteDto } from './create-mensaje-soporte.dto';
export { CreatePreferenciaNotificacionDto } from './create-preferencia-notificacion.dto';
export { UpdatePreferenciaNotificacionDto } from './update-preferencia-notificacion.dto';
