/**
 * Inventario implementado: 9 tablas, 69 columnas; ninguna omitida frente al catalogo.
 * Cada export corresponde al archivo .entity.ts de la tabla indicada.
 * Sin entidades excluidas ni destinos FK pendientes.
 * CHECK, UNIQUE compuestos e indices parciales/de expresion: responsabilidad de PostgreSQL; documentados en cada entidad.
 * Validacion: yarn build y metadatos TypeORM correctos; cotejo con BD pendiente por autenticacion rechazada.
 * usuarios: 15 columnas; PK (id).
 * roles: 5 columnas; PK (id).
 * permisos: 3 columnas; PK (id).
 * roles_permisos: 2 columnas; PK (rol_id, permiso_id).
 *   FK rol_id -> identity.roles (N:1); DELETE CASCADE, UPDATE NO ACTION.
 *   FK permiso_id -> identity.permisos (N:1); DELETE CASCADE, UPDATE NO ACTION.
 * usuarios_roles: 5 columnas; PK (usuario_id, rol_id).
 *   FK usuario_id -> identity.usuarios (N:1); DELETE CASCADE, UPDATE NO ACTION.
 *   FK rol_id -> identity.roles (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK asignado_por -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * sesiones: 8 columnas; PK (id).
 *   FK usuario_id -> identity.usuarios (N:1); DELETE CASCADE, UPDATE NO ACTION.
 * direcciones: 12 columnas; PK (id).
 *   FK usuario_id -> identity.usuarios (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK ciudad_id -> geography.ciudades (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 * consentimientos: 7 columnas; PK (id).
 *   FK usuario_id -> identity.usuarios (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 * verificaciones_identidad: 12 columnas; PK (id).
 *   FK usuario_id -> identity.usuarios (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 *   FK verificado_por -> identity.usuarios (N:1, opcional); DELETE NO ACTION, UPDATE NO ACTION.
 */
export { Usuario } from './usuarios.entity';
export { Rol } from './roles.entity';
export { Permiso } from './permisos.entity';
export { RolPermiso } from './roles-permisos.entity';
export { UsuarioRol } from './usuarios-roles.entity';
export { Sesion } from './sesiones.entity';
export { Direccion } from './direcciones.entity';
export { Consentimiento } from './consentimientos.entity';
export { VerificacionIdentidad } from './verificaciones-identidad.entity';
