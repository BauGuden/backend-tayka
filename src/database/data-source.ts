import { DataSource } from 'typeorm';
import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import type { SeederOptions } from 'typeorm-extension';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { env } from '../config';

export const databaseOptions: PostgresConnectionOptions & SeederOptions = {
  type: 'postgres',
  host: env.database.host,
  port: env.database.port,
  database: env.database.name,
  username: env.database.username,
  password: env.database.password,
  schema: 'public',
  synchronize: false,
  dropSchema: false,
  migrationsRun: false,
  installExtensions: false,
  logging: false,
  connectTimeoutMS: 3000,
  invalidWhereValuesBehavior: { null: 'throw', undefined: 'throw' },
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/[0-9]*{.ts,.js}'],
  migrationsTableName: 'migrations',
  seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
  seedTracking: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export default new DataSource(databaseOptions);
