/**
 * Cobertura: todas las entidades de logistics revisadas contra sus archivos reales y el Anexo A.
 * BD: autenticacion rechazada; no se pudo cotejar el esquema desplegado. Sin SQL de escritura.
 * Servicios/controladores actuales: scaffolding. Estos contratos requieren integracion y autorizacion en consumidores fuera de alcance.
 * DTOs genericos heredados conservados sin cambios por sus imports actuales; no representan CRUD implementado.
 * No se modifica ninguna PK en Update. No se reciben actores autenticados, estados internos, secretos ni montos derivados.
 * UNIQUE, FK, permisos y reglas que necesitan estado persistido se comprueban en servicio/BD.
 * Validacion HTTP pendiente en consumidores: whitelist y forbidNonWhitelisted; los DTOs por si solos no rechazan claves extra.
 * Inventario por entidad: columnas totales, Create/Update, campos permitidos y campos excluidos con motivo.
 *
 * logistics.puntos_retiro (PuntoRetiro): 10 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); usuarioOperadorId -> usuario_operador_id uuid NULL; ciudadId -> ciudad_id uuid NOT NULL; nombre -> nombre varchar(160) NOT NULL; direccion -> direccion varchar(300) NOT NULL; latitud -> latitud numeric(10,7) NULL; longitud -> longitud numeric(10,7) NULL; horario -> horario jsonb NOT NULL DEFAULT '{}'::jsonb; estaActivo -> esta_activo boolean NOT NULL DEFAULT true; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-punto-retiro.dto.ts; permitidos: ciudadId, nombre, direccion, latitud, longitud.
 * Update: update-punto-retiro.dto.ts; permitidos: nombre, direccion, latitud, longitud.
 * Contexto: Metadatos administrativos; requiere autorizacion del consumidor.
 * Excluidos en Create: id (PK generada o identidad de asociacion); usuarioOperadorId (contexto autenticado o comando autorizado); horario (esquema semantico JSON no definido); estaActivo (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); usuarioOperadorId (contexto autenticado o comando autorizado); ciudadId (identidad/referencia inmutable o comando separado); horario (esquema semantico JSON no definido); estaActivo (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor).
 *
 * logistics.transportistas (Transportista): 6 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); nombre -> nombre varchar(150) NOT NULL; telefonoContacto -> telefono_contacto varchar(40) NULL; plantillaUrlSeguimiento -> plantilla_url_seguimiento text NULL; estado -> estado varchar(20) NOT NULL DEFAULT 'activo'; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-transportista.dto.ts; permitidos: nombre, telefonoContacto, plantillaUrlSeguimiento.
 * Update: update-transportista.dto.ts; permitidos: nombre, telefonoContacto, plantillaUrlSeguimiento.
 * Contexto: Metadatos administrativos; requiere autorizacion del consumidor.
 * Excluidos en Create: id (PK generada o identidad de asociacion); estado (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); estado (ciclo de vida o habilitacion mediante comando); creadoEn (marca del servidor).
 *
 * logistics.entregas (Entrega): 14 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); asignacionOrdenId -> asignacion_orden_id uuid NOT NULL; modalidadEntrega -> modalidad_entrega varchar(18) NOT NULL; puntoRetiroId -> punto_retiro_id uuid NULL; datosDestino -> datos_destino jsonb NULL; transportistaId -> transportista_id uuid NULL; numeroSeguimiento -> numero_seguimiento varchar(140) NULL; costo -> costo numeric(24,7) NOT NULL DEFAULT 0; estado -> estado varchar(24) NOT NULL DEFAULT 'pendiente'; entregadoEn -> entregado_en timestamptz NULL; nombreReceptor -> nombre_receptor varchar(180) NULL; urlConstancia -> url_constancia text NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Creacion y transiciones de entrega requieren contrato, destino JSON y reglas de retiro/envio.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * logistics.codigos_retiro (CodigoRetiro): 7 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); entregaId -> entrega_id uuid NOT NULL; hashToken -> hash_token varchar(128) NOT NULL; venceEn -> vence_en timestamptz NOT NULL; canjeadoEn -> canjeado_en timestamptz NULL; canjeadoPor -> canjeado_por uuid NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Codigo secreto generado por servidor; no recibir hashToken.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * logistics.eventos_entrega (EventoEntrega): 7 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); entregaId -> entrega_id uuid NOT NULL; estado -> estado varchar(24) NOT NULL; usuarioActorId -> usuario_actor_id uuid NULL; ubicacion -> ubicacion varchar(250) NULL; detalles -> detalles jsonb NOT NULL DEFAULT '{}'::jsonb; ocurridoEn -> ocurrido_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Registro interno de seguimiento y actor.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 */
export { CreatePuntoRetiroDto } from './create-punto-retiro.dto';
export { UpdatePuntoRetiroDto } from './update-punto-retiro.dto';
export { CreateTransportistaDto } from './create-transportista.dto';
export { UpdateTransportistaDto } from './update-transportista.dto';
