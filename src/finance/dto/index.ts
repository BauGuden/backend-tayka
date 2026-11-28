/**
 * Cobertura: todas las entidades de finance revisadas contra sus archivos reales y el Anexo A.
 * BD: autenticacion rechazada; no se pudo cotejar el esquema desplegado. Sin SQL de escritura.
 * Servicios/controladores actuales: scaffolding. Estos contratos requieren integracion y autorizacion en consumidores fuera de alcance.
 * DTOs genericos heredados conservados sin cambios por sus imports actuales; no representan CRUD implementado.
 * No se modifica ninguna PK en Update. No se reciben actores autenticados, estados internos, secretos ni montos derivados.
 * UNIQUE, FK, permisos y reglas que necesitan estado persistido se comprueban en servicio/BD.
 * Validacion HTTP pendiente en consumidores: whitelist y forbidNonWhitelisted; los DTOs por si solos no rechazan claves extra.
 * Inventario por entidad: columnas totales, Create/Update, campos permitidos y campos excluidos con motivo.
 *
 * finance.medios_pago (MedioPago): 8 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); codigo -> codigo varchar(50) NOT NULL; tipoMedio -> tipo_medio varchar(32) NOT NULL; nombreProveedorServicio -> nombre_proveedor_servicio varchar(120) NULL; codigoMoneda -> codigo_moneda varchar(12) NOT NULL; estaHabilitado -> esta_habilitado boolean NOT NULL DEFAULT false; ambiente -> ambiente varchar(12) NOT NULL DEFAULT 'prueba'; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Provision y habilitacion financiera administrativa sin contrato configurado; no crear CRUD publico.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * finance.obligaciones_pago (ObligacionPago): 11 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); participanteGrupoId -> participante_grupo_id uuid NOT NULL; medioPagoId -> medio_pago_id uuid NULL; montoAdeudado -> monto_adeudado numeric(24,7) NOT NULL; montoVerificado -> monto_verificado numeric(24,7) NOT NULL DEFAULT 0; codigoMoneda -> codigo_moneda varchar(12) NOT NULL; estado -> estado varchar(24) NOT NULL DEFAULT 'creado'; venceEn -> vence_en timestamptz NOT NULL; pagadoEn -> pagado_en timestamptz NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Deuda y monto verificado derivados; proceso financiero interno.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * finance.reembolsos (Reembolso): 11 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); obligacionPagoId -> obligacion_pago_id uuid NOT NULL; motivo -> motivo varchar(70) NOT NULL; monto -> monto numeric(24,7) NOT NULL; codigoMoneda -> codigo_moneda varchar(12) NOT NULL; estado -> estado varchar(20) NOT NULL DEFAULT 'solicitado'; solicitadoPor -> solicitado_por uuid NULL; aprobadoPor -> aprobado_por uuid NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); completadoEn -> completado_en timestamptz NULL; notas -> notas text NULL.
 * Create omitido; Update omitido. Motivo: Solicitud y aprobacion requieren comandos separados y reglas de monto, sin contrato actual.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * finance.liquidaciones_proveedor (LiquidacionProveedor): 9 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); ordenCompraId -> orden_compra_id uuid NOT NULL; proveedorId -> proveedor_id uuid NOT NULL; monto -> monto numeric(24,7) NOT NULL; codigoMoneda -> codigo_moneda varchar(12) NOT NULL; estado -> estado varchar(20) NOT NULL DEFAULT 'pendiente'; aprobadoPor -> aprobado_por uuid NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); confirmadoEn -> confirmado_en timestamptz NULL.
 * Create omitido; Update omitido. Motivo: Liquidacion financiera interna; montos y aprobaciones del servidor.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * finance.transferencias (Transferencia): 20 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); medioPagoId -> medio_pago_id uuid NOT NULL; clase -> clase varchar(24) NOT NULL; obligacionPagoId -> obligacion_pago_id uuid NULL; reembolsoId -> reembolso_id uuid NULL; liquidacionProveedorId -> liquidacion_proveedor_id uuid NULL; iniciadoPor -> iniciado_por uuid NULL; monto -> monto numeric(24,7) NOT NULL; codigoMoneda -> codigo_moneda varchar(12) NOT NULL; referenciaOrigen -> referencia_origen varchar(140) NULL; referenciaDestinatario -> referencia_destinatario varchar(140) NULL; referenciaExterna -> referencia_externa varchar(180) NULL; claveIdempotencia -> clave_idempotencia varchar(160) NULL; estado -> estado varchar(24) NOT NULL DEFAULT 'declarado'; urlComprobante -> url_comprobante text NULL; datosTransferencia -> datos_transferencia jsonb NOT NULL DEFAULT '{}'::jsonb; declaradoEn -> declarado_en timestamptz NOT NULL DEFAULT now(); verificadoEn -> verificado_en timestamptz NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Declaracion y verificacion requieren comandos y reglas por clase; sin contrato autorizado.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * finance.conciliaciones (Conciliacion): 9 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); transferenciaId -> transferencia_id uuid NOT NULL; verificadoPor -> verificado_por uuid NULL; fuenteVerificacion -> fuente_verificacion varchar(32) NOT NULL; resultado -> resultado varchar(20) NOT NULL; transaccionProveedorId -> transaccion_proveedor_id varchar(180) NULL; evidencia -> evidencia jsonb NOT NULL DEFAULT '{}'::jsonb; verificadoEn -> verificado_en timestamptz NOT NULL DEFAULT now(); notas -> notas text NULL.
 * Create omitido; Update omitido. Motivo: Evidencia y resultado de verificacion internos.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 */

