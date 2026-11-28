/**
 * Inventario implementado: 2 tablas, 9 columnas; ninguna omitida frente al catalogo.
 * Cada export corresponde al archivo .entity.ts de la tabla indicada.
 * Sin entidades excluidas ni destinos FK pendientes.
 * CHECK, UNIQUE compuestos e indices parciales/de expresion: responsabilidad de PostgreSQL; documentados en cada entidad.
 * Validacion: yarn build y metadatos TypeORM correctos; cotejo con BD pendiente por autenticacion rechazada.
 * departamentos: 4 columnas; PK (id).
 * ciudades: 5 columnas; PK (id).
 *   FK departamento_id -> geography.departamentos (N:1); DELETE NO ACTION, UPDATE NO ACTION.
 */
export { Departamento } from './departamentos.entity';
export { Ciudad } from './ciudades.entity';
