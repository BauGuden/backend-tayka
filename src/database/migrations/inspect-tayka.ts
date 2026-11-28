import { MigrationExecutor, Table } from 'typeorm';
import dataSource from '../data-source';
import { TAYKA_SCHEMAS } from './1795836889405-CreateTaykaSchemas';
import { BLOCKED_EXPRESSION_INDEX, TAYKA_BASELINE } from './tayka-baseline';
import { existingKnownSchemas } from './tayka-known-schemas';

import { compareTable, tablePath } from './tayka-table-comparison';

async function inspect(): Promise<void> {
  const options = dataSource.options;
  if (
    options.type !== 'postgres' ||
    options.synchronize !== false ||
    options.dropSchema !== false ||
    options.migrationsRun !== false ||
    options.installExtensions !== false
  ) {
    throw new Error(
      'Inspección cancelada por configuración con efectos al conectar',
    );
  }
  await dataSource.initialize();
  const runner = dataSource.createQueryRunner();
  try {
    const [schemas, pending] = await Promise.all([
      existingKnownSchemas(runner),
      new MigrationExecutor(dataSource).getPendingMigrations(),
    ]);
    const names = TAYKA_BASELINE.map((definition) => definition.name);
    const expected = new Set(names);
    const tableNames = [...new Set(names.map((name) => name.split('.')[1]))];
    const candidates = schemas
      .filter(
        (schema) =>
          schema !== 'information_schema' &&
          !schema.startsWith('pg_') &&
          /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(schema),
      )
      .flatMap((schema) => tableNames.map((name) => schema + '.' + name));
    // PostgreSQL parameters and catalog access are owned by QueryRunner. Batch paths to bound statement size.
    const tables: Table[] = [];
    for (let i = 0; i < candidates.length; i += 100) {
      tables.push(...(await runner.getTables(candidates.slice(i, i + 100))));
    }
    const byPath = new Map(
      tables.map((table) => [tablePath(runner, table), table]),
    );
    const legacy = [...byPath.keys()].filter((path) => !expected.has(path));
    const results = TAYKA_BASELINE.map((definition) => {
      const table = byPath.get(definition.name);
      if (!table) return { table: definition.name, state: 'FALTA' };
      const differences = compareTable(runner, new Table(definition), table);
      return {
        table: definition.name,
        state: differences.length
          ? 'DRIFT_POTENCIAL'
          : 'SIN_DIFERENCIAS_DETECTADAS',
        differences,
      };
    });
    console.log(
      JSON.stringify(
        {
          schemas: TAYKA_SCHEMAS.map((name) => ({
            name,
            exists: schemas.includes(name),
          })),
          pending: pending.map((migration) => migration.name),
          legacy,
          results,
          pendingExpressionIndex: BLOCKED_EXPRESSION_INDEX,
        },
        null,
        2,
      ),
    );
  } finally {
    await runner.release();
    await dataSource.destroy();
  }
}

if (require.main === module) {
  void inspect().catch((error: unknown) => {
    const code = (error as { code?: unknown } | null)?.code;
    console.error(
      typeof code === 'string' && /^[A-Z0-9_]{5,20}$/.test(code)
        ? 'Inspecci?n PostgreSQL no disponible (' + code + ')'
        : 'Inspecci?n PostgreSQL no disponible',
    );
    process.exitCode = 1;
  });
}
