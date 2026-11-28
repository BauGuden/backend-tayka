import type { QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';
import { equivalentExpression } from './tayka-expression-comparison';

const typeAliases: Readonly<Record<string, string>> = {
  varchar: 'character varying',
  char: 'character',
  timestamptz: 'timestamp with time zone',
};

const numericTypes = new Set([
  'smallint',
  'integer',
  'bigint',
  'numeric',
  'decimal',
]);
const typeName = (type: string) => typeAliases[type] ?? type;
const key = (columns: readonly string[]) => JSON.stringify([...columns].sort());

export function tablePath(
  runner: QueryRunner,
  table: Table | TableForeignKey,
): string {
  const driver = runner.connection.driver;
  const { tableName, schema } = driver.parseTableName(table);
  return driver.buildTableName(tableName, schema ?? 'public');
}

function defaultValue(column: TableColumn): string | undefined {
  if (column.default == null) {
    // The PG driver collapses gen_random_uuid() and uuid_generate_vN() into this metadata flag.
    return column.isGenerated && column.generationStrategy === 'uuid'
      ? 'uuid-generator'
      : undefined;
  }
  const value = String(column.default);
  if (column.type === 'uuid' && value === 'gen_random_uuid()')
    return 'uuid-generator';
  const numeric = value.match(/^'?(-?\d+(?:\.\d+)?)'?$/);
  if (numericTypes.has(column.type) && numeric) return numeric[1];
  if (column.type === 'jsonb') return value.replace(/::jsonb$/, '');
  return value;
}

function generation(column: TableColumn): string | undefined {
  if (defaultValue(column) === 'uuid-generator') return 'uuid';
  return column.isGenerated
    ? (column.generationStrategy ?? 'generated')
    : undefined;
}

function compareColumn(expected: TableColumn, actual: TableColumn): string[] {
  const checks = [
    ['tipo', typeName(expected.type), typeName(actual.type)],
    ['longitud', expected.length || '', actual.length || ''],
    ['precisión', expected.precision, actual.precision],
    ['escala', expected.scale, actual.scale],
    ['nulabilidad', expected.isNullable, actual.isNullable],
    ['PK', expected.isPrimary, actual.isPrimary],
    ['generación', generation(expected), generation(actual)],
    ['identidad', expected.generatedIdentity, actual.generatedIdentity],
    ['tipo de columna calculada', expected.generatedType, actual.generatedType],
    ['expresión calculada', expected.asExpression, actual.asExpression],
    ['DEFAULT', defaultValue(expected), defaultValue(actual)],
  ] as const;
  return checks
    .filter(([, a, b]) => (a ?? null) !== (b ?? null))
    .map(
      ([label, a, b]) =>
        expected.name +
        ' (' +
        label +
        ' esperado ' +
        String(a) +
        ', encontrado ' +
        String(b) +
        ')',
    );
}

function foreignKey(runner: QueryRunner, fk: TableForeignKey): string {
  return JSON.stringify([
    fk.columnNames,
    tablePath(runner, fk),
    fk.referencedColumnNames,
    fk.onDelete ?? 'NO ACTION',
    fk.onUpdate ?? 'NO ACTION',
    fk.deferrable ?? null,
  ]);
}

function uniqueKeys(table: Table): Set<string> {
  return new Set([
    ...table.uniques.map((unique) => key(unique.columnNames)),
    ...table.columns
      .filter((column) => column.isUnique)
      .map((column) => key([column.name])),
    ...table.indices
      .filter((index) => index.isUnique && !index.where)
      .map((index) => key(index.columnNames)),
  ]);
}

export function compareTable(
  runner: QueryRunner,
  expected: Table,
  actual: Table,
): string[] {
  const differences: string[] = [];
  for (const expectedColumn of expected.columns) {
    const column = actual.findColumnByName(expectedColumn.name);
    if (!column) differences.push('falta columna ' + expectedColumn.name);
    else differences.push(...compareColumn(expectedColumn, column));
  }
  for (const column of actual.columns) {
    if (!expected.findColumnByName(column.name))
      differences.push('columna extra ' + column.name);
  }
  const expectedPrimary = expected.primaryColumns.map((column) => column.name);
  const actualPrimary = actual.primaryColumns.map((column) => column.name);
  if (JSON.stringify(expectedPrimary) !== JSON.stringify(actualPrimary))
    differences.push('orden de la PK diferente');

  function compareSets(
    label: string,
    required: Set<string>,
    found: Set<string>,
  ) {
    for (const item of required)
      if (!found.has(item)) differences.push('falta ' + label + ' ' + item);
    for (const item of found)
      if (!required.has(item))
        differences.push(label + ' adicional o distinta ' + item);
  }
  compareSets('UNIQUE', uniqueKeys(expected), uniqueKeys(actual));
  compareSets(
    'FK',
    new Set(expected.foreignKeys.map((fk) => foreignKey(runner, fk))),
    new Set(actual.foreignKeys.map((fk) => foreignKey(runner, fk))),
  );

  const columnTypes = new Map(
    expected.columns.map((column) => [column.name, typeName(column.type)]),
  );
  const checks = [...actual.checks];
  for (const check of expected.checks) {
    const match = checks.findIndex((candidate) =>
      equivalentExpression(check.expression, candidate.expression, columnTypes),
    );
    if (match < 0)
      differences.push(
        'CHECK pendiente de verificar ' +
          check.name +
          ' [' +
          check.expression +
          ']',
      );
    else checks.splice(match, 1);
  }
  for (const check of checks)
    differences.push(
      'CHECK adicional o distinto ' +
        check.name +
        ' [' +
        check.expression +
        ']',
    );

  const unmatched = actual.indices.filter(
    (index) => !index.isUnique || index.where,
  );
  for (const index of expected.indices) {
    if (index.isUnique && !index.where) continue;
    const match = unmatched.findIndex(
      (candidate) =>
        candidate.isUnique === index.isUnique &&
        JSON.stringify(candidate.columnNames) ===
          JSON.stringify(index.columnNames) &&
        equivalentExpression(index.where, candidate.where, columnTypes),
    );
    if (match < 0)
      differences.push('índice pendiente de verificar ' + index.name);
    else unmatched.splice(match, 1);
  }
  for (const index of unmatched.filter((index) => index.isUnique)) {
    differences.push('índice único adicional o distinto ' + index.name);
  }
  if (actual.exclusions.length && !expected.exclusions.length)
    differences.push('restricciones de exclusión adicionales');
  return differences;
}
