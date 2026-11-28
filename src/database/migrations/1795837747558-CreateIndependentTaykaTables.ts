import { Table, type MigrationInterface, type QueryRunner } from 'typeorm';
import { TAYKA_BASELINE } from './tayka-baseline';
import { existingKnownSchemas } from './tayka-known-schemas';

export const INDEPENDENT_TABLES = [
  'blockchain.activos',
  'blockchain.cursores_indexador',
  'blockchain.despliegues_contrato',
  'blockchain.redes',
  'catalog.categorias',
  'catalog.marcas',
  'finance.medios_pago',
  'geography.ciudades',
  'geography.departamentos',
  'identity.permisos',
  'identity.roles',
  'identity.roles_permisos',
  'logistics.transportistas',
  'operations.claves_idempotencia',
  'operations.eventos_salida',
  'operations.webhooks_entrantes',
] as const;

export class CreateIndependentTaykaTables1795837747558 implements MigrationInterface {
  readonly name = 'CreateIndependentTaykaTables1795837747558';

  async up(runner: QueryRunner): Promise<void> {
    if (!runner.isTransactionActive) {
      throw new Error(
        'La creaci?n de tablas TAYKA requiere una transacci?n activa',
      );
    }

    const names = new Set<string>(INDEPENDENT_TABLES);
    const tables = TAYKA_BASELINE.filter((definition) =>
      names.has(definition.name),
    ).map((definition) => new Table(definition));
    if (tables.length !== names.size) {
      throw new Error('El inventario de tablas independientes est? incompleto');
    }

    const driver = runner.connection.driver;
    for (const table of tables) {
      for (const reference of table.foreignKeys) {
        const target = driver.parseTableName(reference);
        const path = driver.buildTableName(target.tableName, target.schema);
        if (!names.has(path)) {
          throw new Error(
            'FK fuera de esta migraci?n: ' + table.name + ' -> ' + path,
          );
        }
      }
    }

    const schemas = await existingKnownSchemas(runner);
    for (const schema of new Set(
      tables.map((table) => driver.parseTableName(table).schema),
    )) {
      if (!schema || !schemas.includes(schema)) {
        throw new Error(
          'Falta el esquema ' +
            schema +
            '. Aplica primero la migraci?n de esquemas',
        );
      }
    }

    // Stop on existing or legacy tables before creating any object.
    const relevantSchemas = schemas.filter(
      (schema) =>
        schema !== 'information_schema' &&
        !schema.startsWith('pg_') &&
        /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(schema),
    );
    const candidates = relevantSchemas.flatMap((schema) =>
      tables.map((table) =>
        driver.buildTableName(driver.parseTableName(table).tableName, schema),
      ),
    );
    const batchSize = 100;
    for (let offset = 0; offset < candidates.length; offset += batchSize) {
      const existing = await runner.getTables(
        candidates.slice(offset, offset + batchSize),
      );
      if (existing.length) {
        throw new Error(
          'Tablas existentes o heredadas requieren revisar la deriva: ' +
            existing.map((table) => table.name).join(', '),
        );
      }
    }

    for (const table of tables) {
      const columnsAndConstraints = table.clone();
      columnsAndConstraints.foreignKeys = [];
      await runner.createTable(columnsAndConstraints, false, false, true);
    }
    for (const table of tables) {
      if (table.foreignKeys.length) {
        const created = table.clone();
        created.foreignKeys = [];
        await runner.createForeignKeys(created, table.foreignKeys);
      }
    }
  }

  async down(): Promise<void> {
    throw new Error(
      'Reversi?n bloqueada: eliminar tablas requiere un procedimiento autorizado con respaldo',
    );
  }
}
