/**
 * Cobertura: todas las entidades de operations revisadas contra sus archivos reales y el Anexo A.
 * BD: autenticacion rechazada; no se pudo cotejar el esquema desplegado. Sin SQL de escritura.
 * Servicios/controladores actuales: scaffolding. Estos contratos requieren integracion y autorizacion en consumidores fuera de alcance.
 * DTOs genericos heredados conservados sin cambios por sus imports actuales; no representan CRUD implementado.
 * No se modifica ninguna PK en Update. No se reciben actores autenticados, estados internos, secretos ni montos derivados.
 * UNIQUE, FK, permisos y reglas que necesitan estado persistido se comprueban en servicio/BD.
 * Validacion HTTP pendiente en consumidores: whitelist y forbidNonWhitelisted; los DTOs por si solos no rechazan claves extra.
 * Inventario por entidad: columnas totales, Create/Update, campos permitidos y campos excluidos con motivo.
 *
 * operations.claves_idempotencia (ClaveIdempotencia): 8 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); espacioClaves -> espacio_claves varchar(80) NOT NULL; claveIdempotencia -> clave_idempotencia varchar(180) NOT NULL; hashSolicitud -> hash_solicitud varchar(128) NOT NULL; codigoRespuesta -> codigo_respuesta integer NULL; contenidoRespuesta -> contenido_respuesta jsonb NULL; venceEn -> vence_en timestamptz NOT NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Persistencia interna de idempotencia y respuesta.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * operations.eventos_salida (EventoSalida): 10 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); tipoAgregado -> tipo_agregado varchar(80) NOT NULL; agregadoId -> agregado_id uuid NOT NULL; tipoEvento -> tipo_evento varchar(100) NOT NULL; datos -> datos jsonb NOT NULL; estado -> estado varchar(16) NOT NULL DEFAULT 'pendiente'; cantidadReintentos -> cantidad_reintentos integer NOT NULL DEFAULT 0; proximoReintentoEn -> proximo_reintento_en timestamptz NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); entregadoEn -> entregado_en timestamptz NULL.
 * Create omitido; Update omitido. Motivo: Outbox interno; payload y reintentos del servidor.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * operations.registros_auditoria (RegistroAuditoria): 10 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); usuarioActorId -> usuario_actor_id uuid NULL; accion -> accion varchar(100) NOT NULL; tipoEntidad -> tipo_entidad varchar(80) NOT NULL; entidadId -> entidad_id uuid NULL; datosAnteriores -> datos_anteriores jsonb NULL; datosPosteriores -> datos_posteriores jsonb NULL; solicitudId -> solicitud_id varchar(140) NULL; direccionIp -> direccion_ip inet NULL; ocurridoEn -> ocurrido_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Auditoria del servidor; no input publico.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * operations.webhooks_entrantes (WebhookEntrante): 8 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); origen -> origen varchar(80) NOT NULL; eventoExternoId -> evento_externo_id varchar(180) NOT NULL; firmaVerificada -> firma_verificada boolean NOT NULL DEFAULT false; datos -> datos jsonb NOT NULL; estadoProcesamiento -> estado_procesamiento varchar(18) NOT NULL DEFAULT 'recibido'; recibidoEn -> recibido_en timestamptz NOT NULL DEFAULT now(); procesadoEn -> procesado_en timestamptz NULL.
 * Create omitido; Update omitido. Motivo: Recepcion y verificacion de firma requiere contrato de proveedor, no CRUD.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 */
