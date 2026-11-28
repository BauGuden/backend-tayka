import type { MigrationInterface, QueryRunner } from 'typeorm';

export const TAYKA_SCHEMAS = [
  'blockchain',
  'catalog',
  'commerce',
  'community',
  'finance',
  'geography',
  'identity',
  'logistics',
  'operations',
  'support',
] as const;

export class CreateTaykaSchemas1795836889405 implements MigrationInterface {
  readonly name = 'CreateTaykaSchemas1795836889405';

  async up(runner: QueryRunner): Promise<void> {
    for (const schema of TAYKA_SCHEMAS) await runner.createSchema(schema, true);
  }

  async down(): Promise<void> {
    // The schemas may predate this migration or contain application data.
  }
}
