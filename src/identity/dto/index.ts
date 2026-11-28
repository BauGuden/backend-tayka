/**
 * Cobertura: todas las entidades de identity revisadas contra sus archivos reales y el Anexo A.
 * BD: autenticacion rechazada; no se pudo cotejar el esquema desplegado. Sin SQL de escritura.
 * Servicios/controladores actuales: scaffolding. Estos contratos requieren integracion y autorizacion en consumidores fuera de alcance.
 * DTOs genericos heredados conservados sin cambios por sus imports actuales; no representan CRUD implementado.
 * No se modifica ninguna PK en Update. No se reciben actores autenticados, estados internos, secretos ni montos derivados.
 * UNIQUE, FK, permisos y reglas que necesitan estado persistido se comprueban en servicio/BD.
 * Validacion HTTP pendiente en consumidores: whitelist y forbidNonWhitelisted; los DTOs por si solos no rechazan claves extra.
 * Inventario por entidad: columnas totales, Create/Update, campos permitidos y campos excluidos con motivo.
 *
 * identity.usuarios (Usuario): 15 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); correoElectronico -> correo_electronico varchar(254) NOT NULL; telefono -> telefono varchar(30) NULL; hashContrasena -> hash_contrasena text NULL; nombres -> nombres varchar(100) NOT NULL; apellidos -> apellidos varchar(140) NOT NULL; urlAvatar -> url_avatar text NULL; fechaNacimiento -> fecha_nacimiento date NULL; estado -> estado varchar(24) NOT NULL DEFAULT 'pendiente'; correoVerificadoEn -> correo_verificado_en timestamptz NULL; telefonoVerificadoEn -> telefono_verificado_en timestamptz NULL; ultimoAccesoEn -> ultimo_acceso_en timestamptz NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now(); eliminadoEn -> eliminado_en timestamptz NULL.
 * Create: create-usuario.dto.ts; permitidos: correoElectronico, telefono, nombres, apellidos, urlAvatar, fechaNacimiento.
 * Update: update-usuario.dto.ts; permitidos: nombres, apellidos, urlAvatar, fechaNacimiento.
 * Contexto: Alta de perfil sin credenciales; cambios de correo/telefono y verificacion requieren comando separado.
 * Excluidos en Create: id (PK generada o identidad de asociacion); hashContrasena (dato sensible o derivado de fuente verificada); estado (ciclo de vida o habilitacion mediante comando); correoVerificadoEn (marca del servidor); telefonoVerificadoEn (marca del servidor); ultimoAccesoEn (marca del servidor); creadoEn (marca del servidor); actualizadoEn (marca del servidor); eliminadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); correoElectronico (identidad/referencia inmutable o comando separado); telefono (identidad/referencia inmutable o comando separado); hashContrasena (dato sensible o derivado de fuente verificada); estado (ciclo de vida o habilitacion mediante comando); correoVerificadoEn (marca del servidor); telefonoVerificadoEn (marca del servidor); ultimoAccesoEn (marca del servidor); creadoEn (marca del servidor); actualizadoEn (marca del servidor); eliminadoEn (marca del servidor).
 *
 * identity.consentimientos (Consentimiento): 7 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); usuarioId -> usuario_id uuid NOT NULL; tipoPolitica -> tipo_politica varchar(40) NOT NULL; versionPolitica -> version_politica varchar(40) NOT NULL; otorgado -> otorgado boolean NOT NULL; direccionIp -> direccion_ip inet NULL; registradoEn -> registrado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-consentimiento.dto.ts; permitidos: tipoPolitica, versionPolitica, otorgado.
 * Update: omitido; Registrar decision propia; actor e IP del contexto. Historial inmutable; version vigente validada por servicio..
 * Contexto: Registrar decision propia; actor e IP del contexto. Historial inmutable; version vigente validada por servicio.
 * Excluidos en Create: id (PK generada o identidad de asociacion); usuarioId (contexto autenticado o comando autorizado); direccionIp (operacion especifica pendiente; no aceptado en este contrato); registradoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); usuarioId (contexto autenticado o comando autorizado); tipoPolitica (identidad/referencia inmutable o comando separado); versionPolitica (identidad/referencia inmutable o comando separado); otorgado (identidad/referencia inmutable o comando separado); direccionIp (operacion especifica pendiente; no aceptado en este contrato); registradoEn (marca del servidor).
 *
 * identity.direcciones (Direccion): 12 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); usuarioId -> usuario_id uuid NOT NULL; ciudadId -> ciudad_id uuid NULL; etiqueta -> etiqueta varchar(70) NOT NULL DEFAULT 'Principal'; direccion -> direccion varchar(240) NOT NULL; detalleDireccion -> detalle_direccion varchar(240) NULL; referenciasUbicacion -> referencias_ubicacion varchar(240) NULL; latitud -> latitud numeric(10,7) NULL; longitud -> longitud numeric(10,7) NULL; esPrincipal -> es_principal boolean NOT NULL DEFAULT false; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now(); actualizadoEn -> actualizado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-direccion.dto.ts; permitidos: ciudadId, etiqueta, direccion, detalleDireccion, referenciasUbicacion, latitud, longitud, esPrincipal.
 * Update: update-direccion.dto.ts; permitidos: etiqueta, direccion, detalleDireccion, referenciasUbicacion, latitud, longitud, esPrincipal.
 * Contexto: Propiedad del usuario autenticado; direccion principal y pertenencia se resuelven transaccionalmente.
 * Excluidos en Create: id (PK generada o identidad de asociacion); usuarioId (contexto autenticado o comando autorizado); creadoEn (marca del servidor); actualizadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); usuarioId (contexto autenticado o comando autorizado); ciudadId (identidad/referencia inmutable o comando separado); creadoEn (marca del servidor); actualizadoEn (marca del servidor).
 *
 * identity.permisos (Permiso): 3 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); codigo -> codigo varchar(100) NOT NULL; descripcion -> descripcion text NULL.
 * Create: create-permiso.dto.ts; permitidos: codigo, descripcion.
 * Update: update-permiso.dto.ts; permitidos: descripcion.
 * Contexto: Metadatos administrativos; requiere autorizacion del consumidor.
 * Excluidos en Create: id (PK generada o identidad de asociacion).
 * Excluidos en Update: id (PK generada o identidad de asociacion); codigo (identidad/referencia inmutable o comando separado).
 *
 * identity.roles (Rol): 5 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); codigo -> codigo varchar(50) NOT NULL; nombre -> nombre varchar(90) NOT NULL; descripcion -> descripcion text NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-rol.dto.ts; permitidos: codigo, nombre, descripcion.
 * Update: update-rol.dto.ts; permitidos: nombre, descripcion.
 * Contexto: Metadatos administrativos; requiere autorizacion del consumidor.
 * Excluidos en Create: id (PK generada o identidad de asociacion); creadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); codigo (identidad/referencia inmutable o comando separado); creadoEn (marca del servidor).
 *
 * identity.roles_permisos (RolPermiso): 2 columnas revisadas; PK rolId, permisoId.
 * Columnas totales: rolId -> rol_id uuid NOT NULL; permisoId -> permiso_id uuid NOT NULL.
 * Create omitido; Update omitido. Motivo: Asignacion/revocacion de permisos sin caso de uso ni autorizacion implementados.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * identity.sesiones (Sesion): 8 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); usuarioId -> usuario_id uuid NOT NULL; hashTokenRenovacion -> hash_token_renovacion text NOT NULL; direccionIp -> direccion_ip inet NULL; agenteUsuario -> agente_usuario text NULL; venceEn -> vence_en timestamptz NOT NULL; revocadoEn -> revocado_en timestamptz NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: Gestion interna de sesiones, tokens y vencimiento; no CRUD publico.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * identity.usuarios_roles (UsuarioRol): 5 columnas revisadas; PK usuarioId, rolId.
 * Columnas totales: usuarioId -> usuario_id uuid NOT NULL; rolId -> rol_id uuid NOT NULL; asignadoPor -> asignado_por uuid NULL; asignadoEn -> asignado_en timestamptz NOT NULL DEFAULT now(); revocadoEn -> revocado_en timestamptz NULL.
 * Create omitido; Update omitido. Motivo: Asignacion/revocacion de roles privilegiados sin contrato implementado.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 *
 * identity.verificaciones_identidad (VerificacionIdentidad): 12 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); usuarioId -> usuario_id uuid NOT NULL; tipoDocumento -> tipo_documento varchar(40) NOT NULL; ultimos4Documento -> ultimos4_documento varchar(4) NULL; documentoCifrado -> documento_cifrado bytea NULL; codigoPais -> codigo_pais char(2) NOT NULL DEFAULT 'BO'; estado -> estado varchar(22) NOT NULL DEFAULT 'pendiente'; verificadoPor -> verificado_por uuid NULL; verificadoEn -> verificado_en timestamptz NULL; venceEn -> vence_en timestamptz NULL; notas -> notas text NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create omitido; Update omitido. Motivo: KYC, cifrado y revision sin contrato autorizado.
 * Campos prohibidos/implicitos: todas las columnas anteriores; ningun contrato publico de escritura implementado.
 */
export { CreateUsuarioDto } from './create-usuario.dto';
export { UpdateUsuarioDto } from './update-usuario.dto';
export { CreateConsentimientoDto } from './create-consentimiento.dto';
export { CreateDireccionDto } from './create-direccion.dto';
export { UpdateDireccionDto } from './update-direccion.dto';
export { CreatePermisoDto } from './create-permiso.dto';
export { UpdatePermisoDto } from './update-permiso.dto';
export { CreateRolDto } from './create-rol.dto';
export { UpdateRolDto } from './update-rol.dto';
