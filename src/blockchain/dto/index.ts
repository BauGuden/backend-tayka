/**
 * Cobertura: todas las entidades de blockchain revisadas contra sus archivos reales y el Anexo A.
 * BD: autenticacion rechazada; no se pudo cotejar el esquema desplegado. Sin SQL de escritura.
 * Servicios/controladores actuales: scaffolding. Estos contratos requieren integracion y autorizacion en consumidores fuera de alcance.
 * DTOs genericos heredados conservados sin cambios por sus imports actuales; no representan CRUD implementado.
 * No se modifica ninguna PK en Update. No se reciben actores autenticados, estados internos, secretos ni montos derivados.
 * UNIQUE, FK, permisos y reglas que necesitan estado persistido se comprueban en servicio/BD.
 * Validacion HTTP pendiente en consumidores: whitelist y forbidNonWhitelisted; los DTOs por si solos no rechazan claves extra.
 * Inventario por entidad: columnas totales, Create/Update, campos permitidos y campos excluidos con motivo.
 *
 * blockchain.redes (Red): 5 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); nombre -> nombre varchar(40) NOT NULL; fraseRed -> frase_red text NOT NULL; urlRpc -> url_rpc text NOT NULL; estaHabilitado -> esta_habilitado boolean NOT NULL DEFAULT true.
 * Create: create-red.dto.ts; permitidos: nombre, fraseRed, urlRpc.
 * Update: update-red.dto.ts; permitidos: nombre, fraseRed, urlRpc.
 * Contexto: Metadatos administrativos; requiere autorizacion del consumidor.
 * Excluidos en Create: id (PK generada o identidad de asociacion); estaHabilitado (ciclo de vida o habilitacion mediante comando).
 * Excluidos en Update: id (PK generada o identidad de asociacion); estaHabilitado (ciclo de vida o habilitacion mediante comando).
 *
 * blockchain.activos (Activo): 8 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); redId -> red_id uuid NOT NULL; codigoActivo -> codigo_activo varchar(24) NOT NULL; direccionEmisor -> direccion_emisor varchar(100) NULL; direccionContrato -> direccion_contrato varchar(100) NULL; decimales -> decimales smallint NOT NULL DEFAULT 7; estaHabilitado -> esta_habilitado boolean NOT NULL DEFAULT false; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-activo.dto.ts; permitidos: redId, codigoActivo, direccionEmisor, direccionContrato, decimales.
 * Update: update-activo.dto.ts; permitidos: codigoActivo, direccionEmisor, direccionContrato, decimales.
 * Contexto: Metadatos administrativos; requiere autorizacion del consumidor.
 * Excluidos en Create: id (PK generada o identidad de asociacion); estaHabilitado (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); redId (identidad/referencia inmutable o comando separado); estaHabilitado (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor).
 *
 * blockchain.billeteras (Billetera): 7 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); redId -> red_id uuid NOT NULL; usuarioId -> usuario_id uuid NULL; proveedorId -> proveedor_id uuid NULL; direccionPublica -> direccion_publica varchar(100) NOT NULL; verificadoEn -> verificado_en timestamptz NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Vinculacion requiere verificar propiedad y definir titular; no aceptar usuarioId/proveedorId arbitrarios.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * blockchain.cursores_indexador (CursorIndexador): 6 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); redId -> red_id uuid NOT NULL; nombreFlujo -> nombre_flujo varchar(70) NOT NULL; ultimoLibroMayor -> ultimo_libro_mayor bigint NOT NULL DEFAULT 0; valorCursor -> valor_cursor text NULL; actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Posicion interna del indexador; no CRUD publico.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * blockchain.despliegues_contrato (DespliegueContrato): 8 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); redId -> red_id uuid NOT NULL; nombreContrato -> nombre_contrato varchar(100) NOT NULL; direccionContrato -> direccion_contrato varchar(100) NOT NULL; hashWasm -> hash_wasm varchar(128) NULL; version -> version varchar(40) NOT NULL; desplegadoEn -> desplegado_en timestamptz NULL; estaActivo -> esta_activo boolean NOT NULL DEFAULT true.
 * Create: create-despliegue-contrato.dto.ts; permitidos: redId, nombreContrato, direccionContrato, version.
 * Update: update-despliegue-contrato.dto.ts; permitidos: nombreContrato, version.
 * Contexto: Solo metadatos administrativos; hash y fecha de despliegue se obtienen de fuente verificada.
 * Excluidos en Create: id (PK generada o identidad de asociacion); hashWasm (dato sensible o derivado de fuente verificada); desplegadoEn (marca del servidor); estaActivo (ciclo de vida o habilitacion mediante comando).
 * Excluidos en Update: id (PK generada o identidad de asociacion); redId (identidad/referencia inmutable o comando separado); direccionContrato (identidad/referencia inmutable o comando separado); hashWasm (dato sensible o derivado de fuente verificada); desplegadoEn (marca del servidor); estaActivo (ciclo de vida o habilitacion mediante comando).
 *
 * blockchain.transacciones (Transaccion): 10 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); redId -> red_id uuid NOT NULL; hashTransaccion -> hash_transaccion varchar(128) NOT NULL; billeteraOrigenId -> billetera_origen_id uuid NULL; secuenciaLibroMayor -> secuencia_libro_mayor bigint NULL; estado -> estado varchar(20) NOT NULL DEFAULT 'enviado'; comisionStroops -> comision_stroops bigint NULL; enviadoEn -> enviado_en timestamptz NOT NULL DEFAULT now(); confirmadoEn -> confirmado_en timestamptz NULL; resultadoBruto -> resultado_bruto jsonb NULL.
 * Create omitido; Update omitido. Motivo: Registro verificado del indexador, hashes, ledger y resultado.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * blockchain.eventos_contrato (EventoContrato): 9 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); transaccionId -> transaccion_id uuid NOT NULL; despliegueId -> despliegue_id uuid NULL; indiceEvento -> indice_evento integer NOT NULL; tipoEvento -> tipo_evento varchar(100) NULL; temas -> temas jsonb NOT NULL DEFAULT '[]'::jsonb; datos -> datos jsonb NOT NULL DEFAULT '{}'::jsonb; secuenciaLibroMayor -> secuencia_libro_mayor bigint NULL; registradoEn -> registrado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Evento derivado de indexacion, sin escritura arbitraria.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * blockchain.operaciones_contrato (OperacionContrato): 17 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); despliegueId -> despliegue_id uuid NOT NULL; transaccionId -> transaccion_id uuid NULL; tipoOperacion -> tipo_operacion varchar(40) NOT NULL; grupoId -> grupo_id uuid NULL; participanteId -> participante_id uuid NULL; obligacionPagoId -> obligacion_pago_id uuid NULL; transferenciaId -> transferencia_id uuid NULL; reembolsoId -> reembolso_id uuid NULL; ordenCompraId -> orden_compra_id uuid NULL; claveGrupoContrato -> clave_grupo_contrato varchar(140) NULL; solicitudId -> solicitud_id varchar(150) NOT NULL; estado -> estado varchar(22) NOT NULL DEFAULT 'creado'; argumentos -> argumentos jsonb NOT NULL DEFAULT '{}'::jsonb; resultado -> resultado jsonb NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Invocacion controlada sin contrato de argumentos, autorizacion ni idempotencia.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 */
export { CreateRedDto } from './create-red.dto';
export { UpdateRedDto } from './update-red.dto';
export { CreateActivoDto } from './create-activo.dto';
export { UpdateActivoDto } from './update-activo.dto';
export { CreateDespliegueContratoDto } from './create-despliegue-contrato.dto';
export { UpdateDespliegueContratoDto } from './update-despliegue-contrato.dto';
