/**
 * Cobertura: todas las entidades de commerce revisadas contra sus archivos reales y el Anexo A.
 * BD: autenticacion rechazada; no se pudo cotejar el esquema desplegado. Sin SQL de escritura.
 * Servicios/controladores actuales: scaffolding. Estos contratos requieren integracion y autorizacion en consumidores fuera de alcance.
 * DTOs genericos heredados conservados sin cambios por sus imports actuales; no representan CRUD implementado.
 * No se modifica ninguna PK en Update. No se reciben actores autenticados, estados internos, secretos ni montos derivados.
 * UNIQUE, FK, permisos y reglas que necesitan estado persistido se comprueban en servicio/BD.
 * Validacion HTTP pendiente en consumidores: whitelist y forbidNonWhitelisted; los DTOs por si solos no rechazan claves extra.
 * Inventario por entidad: columnas totales, Create/Update, campos permitidos y campos excluidos con motivo.
 *
 * commerce.ofertas (Oferta): 20 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); proveedorId -> proveedor_id uuid NOT NULL; varianteId -> variante_id uuid NOT NULL; almacenId -> almacen_id uuid NULL; autorizadoPor -> autorizado_por uuid NULL; titulo -> titulo varchar(220) NOT NULL; descripcionCondiciones -> descripcion_condiciones text NULL; codigoMoneda -> codigo_moneda varchar(12) NOT NULL DEFAULT 'BOB'; precioUnitario -> precio_unitario numeric(20,7) NOT NULL; precioMinoristaReferencia -> precio_minorista_referencia numeric(20,7) NULL; cantidadMinimaPedido -> cantidad_minima_pedido numeric(16,3) NOT NULL; minimoCompradores -> minimo_compradores integer NOT NULL DEFAULT 0; cantidadMaxima -> cantidad_maxima numeric(16,3) NULL; vigenteDesde -> vigente_desde timestamptz NOT NULL; vigenteHasta -> vigente_hasta timestamptz NOT NULL; estado -> estado varchar(22) NOT NULL DEFAULT 'borrador'; condicionesGarantia -> condiciones_garantia text NULL; condicionesDevolucion -> condiciones_devolucion text NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-oferta.dto.ts; permitidos: varianteId, almacenId, titulo, descripcionCondiciones, codigoMoneda, precioUnitario, precioMinoristaReferencia, cantidadMinimaPedido, minimoCompradores, cantidadMaxima, vigenteDesde, vigenteHasta, condicionesGarantia, condicionesDevolucion.
 * Update: update-oferta.dto.ts; permitidos: titulo, descripcionCondiciones, codigoMoneda, precioUnitario, precioMinoristaReferencia, cantidadMinimaPedido, minimoCompradores, cantidadMaxima, vigenteDesde, vigenteHasta, condicionesGarantia, condicionesDevolucion.
 * Contexto: Proveedor desde contexto autorizado; precios ofertados editables solo bajo reglas comerciales. No montos congelados.
 * Excluidos en Create: id (PK generada o identidad de asociacion); proveedorId (operacion especifica pendiente; no aceptado en este contrato); autorizadoPor (contexto autenticado o comando autorizado); estado (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor); actualizadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); proveedorId (operacion especifica pendiente; no aceptado en este contrato); varianteId (identidad/referencia inmutable o comando separado); almacenId (identidad/referencia inmutable o comando separado); autorizadoPor (contexto autenticado o comando autorizado); estado (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor); actualizadoEn (marca del servidor).
 *
 * commerce.versiones_oferta (VersionOferta): 7 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); ofertaId -> oferta_id uuid NOT NULL; numeroVersion -> numero_version integer NOT NULL; condicionesFijadas -> condiciones_fijadas jsonb NOT NULL; hashCondiciones -> hash_condiciones varchar(128) NULL; creadoPor -> creado_por uuid NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Instantanea de condiciones generada por servidor; no mutable.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * commerce.grupos_compra (GrupoCompra): 18 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); ofertaId -> oferta_id uuid NOT NULL; versionOfertaId -> version_oferta_id uuid NOT NULL; abiertoPor -> abierto_por uuid NOT NULL; codigoGrupo -> codigo_grupo varchar(40) NOT NULL; estado -> estado varchar(26) NOT NULL DEFAULT 'abierto'; cantidadMinimaFijada -> cantidad_minima_fijada numeric(16,3) NOT NULL; minimoCompradoresFijado -> minimo_compradores_fijado integer NOT NULL; precioFijado -> precio_fijado numeric(20,7) NOT NULL; codigoMoneda -> codigo_moneda varchar(12) NOT NULL DEFAULT 'BOB'; abiertoEn -> abierto_en timestamptz NOT NULL DEFAULT now(); plazoAdhesion -> plazo_adhesion timestamptz NOT NULL; pagoAbiertoEn -> pago_abierto_en timestamptz NULL; plazoPago -> plazo_pago timestamptz NULL; cerradoEn -> cerrado_en timestamptz NULL; motivoCancelacion -> motivo_cancelacion text NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Apertura y transiciones requieren reglas, plazos y montos derivados; contrato pendiente.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * commerce.ordenes_compra (OrdenCompra): 14 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); grupoId -> grupo_id uuid NOT NULL; proveedorId -> proveedor_id uuid NOT NULL; numeroOrden -> numero_orden varchar(50) NOT NULL; estado -> estado varchar(24) NOT NULL DEFAULT 'preparado'; cantidadTotal -> cantidad_total numeric(16,3) NOT NULL; subtotal -> subtotal numeric(24,7) NOT NULL; codigoMoneda -> codigo_moneda varchar(12) NOT NULL DEFAULT 'BOB'; referenciaExternaProveedor -> referencia_externa_proveedor varchar(120) NULL; emitidoPor -> emitido_por uuid NOT NULL; emitidoEn -> emitido_en timestamptz NULL; aceptadoEn -> aceptado_en timestamptz NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Emision interna con subtotal, cantidades y actor verificados.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * commerce.participantes_grupo (ParticipanteGrupo): 15 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); grupoId -> grupo_id uuid NOT NULL; usuarioId -> usuario_id uuid NOT NULL; cantidad -> cantidad numeric(16,3) NOT NULL; precioUnitarioFijado -> precio_unitario_fijado numeric(20,7) NOT NULL; cargoEnvio -> cargo_envio numeric(20,7) NOT NULL DEFAULT 0; cargoServicio -> cargo_servicio numeric(20,7) NOT NULL DEFAULT 0; cargoImpuestos -> cargo_impuestos numeric(20,7) NOT NULL DEFAULT 0; totalAdeudado -> total_adeudado numeric(24,7) NULL GENERATED STORED; modalidadEntrega -> modalidad_entrega varchar(18) NOT NULL; ciudadDestinoId -> ciudad_destino_id uuid NULL; versionCondicionesAceptadaId -> version_condiciones_aceptada_id uuid NOT NULL; estado -> estado varchar(20) NOT NULL DEFAULT 'activo'; adheridoEn -> adherido_en timestamptz NOT NULL DEFAULT now(); actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Adhesion requiere precios fijados, condiciones, modalidad y autenticacion; falta contrato de comando.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * commerce.asignaciones_orden (AsignacionOrden): 6 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); ordenCompraId -> orden_compra_id uuid NOT NULL; participanteId -> participante_id uuid NOT NULL; cantidadAsignada -> cantidad_asignada numeric(16,3) NOT NULL; costoAsignado -> costo_asignado numeric(24,7) NOT NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Distribucion interna de cantidades y costos.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * commerce.destinos_oferta (DestinoOferta): 6 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); ofertaId -> oferta_id uuid NOT NULL; ciudadId -> ciudad_id uuid NOT NULL; modalidadEntrega -> modalidad_entrega varchar(18) NOT NULL; costoEnvioEstimado -> costo_envio_estimado numeric(20,7) NOT NULL DEFAULT 0; estaHabilitado -> esta_habilitado boolean NOT NULL DEFAULT true.
 * Create: create-destino-oferta.dto.ts; permitidos: ofertaId, ciudadId, modalidadEntrega, costoEnvioEstimado.
 * Update: update-destino-oferta.dto.ts; permitidos: costoEnvioEstimado.
 * Contexto: Configuracion por proveedor autorizado; identidad de asociacion inmutable.
 * Excluidos en Create: id (PK generada o identidad de asociacion); estaHabilitado (ciclo de vida o habilitacion mediante comando).
 * Excluidos en Update: id (PK generada o identidad de asociacion); ofertaId (identidad/referencia inmutable o comando separado); ciudadId (identidad/referencia inmutable o comando separado); modalidadEntrega (identidad/referencia inmutable o comando separado); estaHabilitado (ciclo de vida o habilitacion mediante comando).
 *
 * commerce.detalles_orden_compra (DetalleOrdenCompra): 6 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); ordenCompraId -> orden_compra_id uuid NOT NULL; varianteId -> variante_id uuid NOT NULL; cantidad -> cantidad numeric(16,3) NOT NULL; precioUnitario -> precio_unitario numeric(20,7) NOT NULL; totalLinea -> total_linea numeric(24,7) NULL GENERATED STORED.
 * Create omitido; Update omitido. Motivo: Detalle derivado; totalLinea calculado por PostgreSQL.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * commerce.eventos_grupo (EventoGrupo): 8 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); grupoId -> grupo_id uuid NOT NULL; usuarioActorId -> usuario_actor_id uuid NULL; tipoEvento -> tipo_evento varchar(70) NOT NULL; estadoAnterior -> estado_anterior varchar(26) NULL; estadoNuevo -> estado_nuevo varchar(26) NULL; datosEvento -> datos_evento jsonb NOT NULL DEFAULT '{}'::jsonb; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Registro interno de eventos, actor, estados y tiempo del servidor.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * commerce.lista_espera (ListaEspera): 8 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); grupoId -> grupo_id uuid NOT NULL; usuarioId -> usuario_id uuid NOT NULL; cantidadDeseada -> cantidad_deseada numeric(16,3) NOT NULL; estado -> estado varchar(18) NOT NULL DEFAULT 'esperando'; invitadoEn -> invitado_en timestamptz NULL; respondidoEn -> respondido_en timestamptz NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Ingreso/salida requiere comando definido y autorizacion; no CRUD de estados.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * commerce.reservas_inventario (ReservaInventario): 8 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); existenciaId -> existencia_id uuid NOT NULL; grupoId -> grupo_id uuid NOT NULL; ordenCompraId -> orden_compra_id uuid NOT NULL; cantidadReservada -> cantidad_reservada numeric(16,3) NOT NULL; estado -> estado varchar(16) NOT NULL DEFAULT 'activo'; reservadoEn -> reservado_en timestamptz NOT NULL DEFAULT now(); liberadoEn -> liberado_en timestamptz NULL.
 * Create omitido; Update omitido. Motivo: Proceso transaccional de reserva/consumo/liberacion.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 */
export { CreateOfertaDto } from './create-oferta.dto';
export { UpdateOfertaDto } from './update-oferta.dto';
export { CreateDestinoOfertaDto } from './create-destino-oferta.dto';
export { UpdateDestinoOfertaDto } from './update-destino-oferta.dto';
