import type { QueryRunner } from 'typeorm';
import { TAYKA_SCHEMAS } from './1795836889405-CreateTaykaSchemas';

const KNOWN_SCHEMAS = [
  ...TAYKA_SCHEMAS,
  'public',
  'tayka',
  'geografia',
  'identidad',
  'catalogo',
  'comercio',
  'finanzas',
  'logistica',
  'cadena_bloques',
  'comunidad',
  'soporte',
  'operaciones',
] as const;

export async function existingKnownSchemas(
  runner: QueryRunner,
): Promise<string[]> {
  // PostgreSQL's getSchemas() returns an empty list in TypeORM 0.3.31.
  const existing: string[] = [];
  for (const schema of KNOWN_SCHEMAS) {
    if (await runner.hasSchema(schema)) existing.push(schema);
  }
  return existing;
}
