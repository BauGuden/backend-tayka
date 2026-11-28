import { Table, type MigrationInterface, type QueryRunner } from 'typeorm';
import { INDEPENDENT_TABLES } from './1795837747558-CreateIndependentTaykaTables';
import { TAYKA_SCHEMAS } from './1795836889405-CreateTaykaSchemas';
import { TAYKA_BASELINE } from './tayka-baseline';
import { existingKnownSchemas } from './tayka-known-schemas';
import { compareTable, tablePath } from './tayka-table-comparison';

const earlierTables: ReadonlySet<string> = new Set(INDEPENDENT_TABLES);
export const REMAINING_TABLES = TAYKA_BASELINE.filter(
  (table) => !earlierTables.has(table.name),
);

// PostgresQueryRunner records the two STORED expressions in TypeORM's internal table.
// The automatic schema builder skips these entities because synchronize is disabled.
const metadataTable = () =>
  new Table({
    name: 'public.typeorm_metadata',
    columns: [
      { name: 'type', type: 'varchar' },
      { name: 'database', type: 'varchar', isNullable: true },
      { name: 'schema', type: 'varchar', isNullable: true },
      { name: 'table', type: 'varchar', isNullable: true },
      { name: 'name', type: 'varchar', isNullable: true },
      { name: 'value', type: 'text', isNullable: true },
    ],
  });

export class CreateRemainingTaykaTables1795838346286 implements MigrationInterface {
  readonly name = 'CreateRemainingTaykaTables1795838346286';

  async up(runner: QueryRunner): Promise<void> {
    if (!runner.isTransactionActive) {
      throw new Error('Esta migración requiere una transacción activa');
    }
    if (REMAINING_TABLES.length !== 48) {
      throw new Error('La migración espera 48 tablas en el inventario');
    }

    const schemas = await existingKnownSchemas(runner);
    const missingSchemas = TAYKA_SCHEMAS.filter(
      (schema) => !schemas.includes(schema),
    );
    if (missingSchemas.length)
      throw new Error('Faltan esquemas: ' + missingSchemas.join(', '));

    const definitions = TAYKA_BASELINE.map((options) => new Table(options));
    const indexes = new Set(definitions.map((table) => table.name));
    for (const table of definitions) {
      for (const foreignKey of table.foreignKeys) {
        if (!indexes.has(tablePath(runner, foreignKey))) {
          throw new Error(
            'FK fuera del inventario: ' + table.name + ' / ' + foreignKey.name,
          );
        }
      }
    }

    // Detect legacy copies by inspecting only the named model tables in known schemas.
    const names = [
      ...new Set(definitions.map((table) => table.name.split('.')[1])),
    ];
    const candidates = schemas.flatMap((schema) =>
      names.map((name) => schema + '.' + name),
    );
    const existing = new Map<string, Table>();
    const metadata = metadataTable();
    const oldMetadata = await runner.getTable(metadata.name);
    if (!oldMetadata) {
      for (const table of definitions.filter((table) =>
        table.columns.some((column) => column.asExpression),
      )) {
        if (await runner.hasTable(table.name)) {
          throw new Error(
            'No se puede comprobar la expresión STORED de ' +
              table.name +
              ' sin typeorm_metadata',
          );
        }
      }
    }
    for (let offset = 0; offset < candidates.length; offset += 100) {
      for (const table of await runner.getTables(
        candidates.slice(offset, offset + 100),
      )) {
        const path = tablePath(runner, table);
        if (!indexes.has(path))
          throw new Error('Tabla TAYKA en ubicación inesperada: ' + path);
        existing.set(path, table);
      }
    }

    const drift: string[] = [];
    const missing: Table[] = [];
    for (const expected of definitions) {
      const table = existing.get(expected.name);
      if (table) {
        drift.push(
          ...compareTable(runner, expected, table).map(
            (message) => expected.name + ': ' + message,
          ),
        );
      } else if (earlierTables.has(expected.name)) {
        drift.push('Falta la tabla de la migración anterior: ' + expected.name);
      } else {
        missing.push(expected);
      }
    }
    if (oldMetadata) {
      drift.push(
        ...compareTable(runner, metadata, oldMetadata).map(
          (message) => metadata.name + ': ' + message,
        ),
      );
    }
    if (drift.length)
      throw new Error('Deriva de esquema:\n' + drift.join('\n'));

    if (
      !oldMetadata &&
      missing.some((table) =>
        table.columns.some((column) => column.asExpression),
      )
    ) {
      await runner.createTable(metadata);
    }
    const plans = missing.map((table) => {
      const base = table.clone();
      base.foreignKeys = [];
      base.indices = [];
      return { base, foreignKeys: table.foreignKeys, indices: table.indices };
    });
    for (const { base } of plans) {
      await runner.createTable(base, false, false, false);
    }
    for (const { base, foreignKeys } of plans) {
      if (foreignKeys.length) await runner.createForeignKeys(base, foreignKeys);
    }
    for (const { base, indices } of plans) {
      if (indices.length) await runner.createIndices(base, indices);
    }

    // TableIndex cannot represent lower(correo_electronico). See README for the missing unique index.
  }

  async down(): Promise<void> {
    throw new Error(
      'Reversión bloqueada: las tablas pueden contener datos y ser preexistentes',
    );
  }
}
