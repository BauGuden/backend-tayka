import {
  Injectable,
  InternalServerErrorException,
  OnApplicationShutdown,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  DataSource,
  EntityTarget,
  ObjectLiteral,
  QueryFailedError,
  Repository,
} from 'typeorm';
import { env } from '../../config';
import dataSource from '../../database/data-source';

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  private readonly source = dataSource;
  private connecting?: Promise<DataSource>;

  async read<T extends ObjectLiteral, R>(
    entity: EntityTarget<T>,
    operation: (repository: Repository<T>) => Promise<R>,
  ): Promise<R> {
    const source = await this.connect();
    try {
      return await operation(source.getRepository(entity));
    } catch (error) {
      const driverError =
        error instanceof QueryFailedError ? error.driverError : error;
      const code = (driverError as { code?: string } | null)?.code;
      if (
        code?.startsWith('08') ||
        [
          'ECONNREFUSED',
          'ECONNRESET',
          'ETIMEDOUT',
          '57P01',
          '42P01',
          '3F000',
        ].includes(code ?? '')
      ) {
        throw new ServiceUnavailableException('Base de datos no disponible');
      }
      if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException(
          'No se pudo consultar la base de datos',
        );
      }
      throw error;
    }
  }

  private async connect(): Promise<DataSource> {
    if (!env.database.enabled) {
      throw new ServiceUnavailableException('Base de datos no disponible');
    }
    try {
      this.connecting ??= this.source.initialize().catch((error: unknown) => {
        this.connecting = undefined;
        throw error;
      });
      return await this.connecting;
    } catch {
      throw new ServiceUnavailableException('Base de datos no disponible');
    }
  }

  async onApplicationShutdown(): Promise<void> {
    const source = await this.connecting?.catch(() => undefined);
    if (source?.isInitialized) await source.destroy();
  }
}
