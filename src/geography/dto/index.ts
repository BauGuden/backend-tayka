/**
 * Cobertura: todas las entidades de geography revisadas contra sus archivos reales y el Anexo A.
 * BD: autenticacion rechazada; no se pudo cotejar el esquema desplegado. Sin SQL de escritura.
 * Servicios/controladores actuales: scaffolding. Estos contratos requieren integracion y autorizacion en consumidores fuera de alcance.
 * DTOs genericos heredados conservados sin cambios por sus imports actuales; no representan CRUD implementado.
 * No se modifica ninguna PK en Update. No se reciben actores autenticados, estados internos, secretos ni montos derivados.
 * UNIQUE, FK, permisos y reglas que necesitan estado persistido se comprueban en servicio/BD.
 * Validacion HTTP pendiente en consumidores: whitelist y forbidNonWhitelisted; los DTOs por si solos no rechazan claves extra.
 * Inventario por entidad: columnas totales, Create/Update, campos permitidos y campos excluidos con motivo.
 *
 * geography.departamentos (Departamento): 4 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); nombre -> nombre varchar(100) NOT NULL; abreviatura -> abreviatura varchar(8) NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-departamento.dto.ts; permitidos: nombre, abreviatura.
 * Update: update-departamento.dto.ts; permitidos: nombre, abreviatura.
 * Contexto: Catalogo administrativo existente; integracion pendiente.
 * Excluidos en Create: id (PK generada o identidad de asociacion); creadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); creadoEn (marca del servidor).
 *
 * geography.ciudades (Ciudad): 5 columnas revisadas; PK id.
 * Columnas totales: id -> id uuid NOT NULL DEFAULT gen_random_uuid(); departamentoId -> departamento_id uuid NOT NULL; nombre -> nombre varchar(120) NOT NULL; codigoPostal -> codigo_postal varchar(20) NULL; creadoEn -> creado_en timestamptz NOT NULL DEFAULT now().
 * Create: create-ciudad.dto.ts; permitidos: departamentoId, nombre, codigoPostal.
 * Update: update-ciudad.dto.ts; permitidos: nombre, codigoPostal.
 * Contexto: Catalogo administrativo existente; integracion pendiente.
 * Excluidos en Create: id (PK generada o identidad de asociacion); creadoEn (marca del servidor).
 * Excluidos en Update: id (PK generada o identidad de asociacion); departamentoId (identidad/referencia inmutable o comando separado); creadoEn (marca del servidor).
 */
export { CreateDepartamentoDto } from './create-departamento.dto';
export { UpdateDepartamentoDto } from './update-departamento.dto';
export { CreateCiudadDto } from './create-ciudad.dto';
export { UpdateCiudadDto } from './update-ciudad.dto';

