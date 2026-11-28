import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Max } from 'class-validator';
import {
  FindOperator,
  FindOptionsOrder,
  FindOptionsSelect,
  FindOptionsWhere,
  ILike,
  ObjectLiteral,
} from 'typeorm';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { DatabaseService } from './database.service';

export class PageQuery extends PaginationDto {
  @IsInt()
  @ApiPropertyOptional({ type: Number, minimum: 1, maximum: 10000, default: 1 })
  @Max(10000)
  declare page?: number;

  @IsInt()
  @ApiPropertyOptional({ type: Number, minimum: 1, maximum: 100, default: 20 })
  @Max(100)
  declare limit?: number;
}

export function containsIgnoreCase(value: string) {
  return ILike('%' + value.replace(/[\\%_]/g, '\\$&') + '%');
}

export type Filter<T, Depth extends number[] = [1, 1, 1, 1, 1, 1]> = {
  [K in keyof T]?: NonNullable<T[K]> extends string | number | boolean | Date
    ? NonNullable<T[K]> | FindOperator<NonNullable<T[K]>>
    : Depth extends [number, ...infer Rest extends number[]]
      ? Filter<NonNullable<T[K]>, Rest>
      : never;
};

@Injectable()
export class ReadModelService {
  constructor(private readonly database: DatabaseService) {}

  list<T extends ObjectLiteral, K extends keyof T & string>(
    entity: new () => T,
    columns: readonly K[],
    page: PageQuery,
    where?: Filter<NoInfer<T>> | Filter<NoInfer<T>>[],
    order: FindOptionsOrder<NoInfer<T>> = {
      id: 'ASC',
    } as unknown as FindOptionsOrder<T>,
  ): Promise<Pick<T, K>[]> {
    const take = page.limit ?? 20;
    return this.database.read(entity, async (repository) => {
      const rows = await repository.find({
        select: selectFields<T>(columns),
        where: where as FindOptionsWhere<T> | FindOptionsWhere<T>[],
        order,
        take,
        skip: ((page.page ?? 1) - 1) * take,
      });
      return rows.map((row) => pickFields(row, columns));
    });
  }

  async detail<T extends ObjectLiteral, K extends keyof T & string>(
    entity: new () => T,
    columns: readonly K[],
    where: Filter<NoInfer<T>> | Filter<NoInfer<T>>[],
  ): Promise<Pick<T, K>> {
    const row = await this.database.read(entity, (repository) =>
      repository.findOne({
        select: selectFields<T>(columns),
        where: where as FindOptionsWhere<T> | FindOptionsWhere<T>[],
      }),
    );
    if (!row) throw new NotFoundException('Recurso no encontrado');
    return pickFields(row, columns);
  }
}

export function selectFields<T extends ObjectLiteral>(
  columns: readonly string[],
): FindOptionsSelect<T> {
  return Object.fromEntries(
    columns.map((column) => [column, true]),
  ) as FindOptionsSelect<T>;
}

export function pickFields<T extends ObjectLiteral, K extends keyof T>(
  row: T,
  columns: readonly K[],
): Pick<T, K> {
  return Object.fromEntries(
    columns.map((column) => [column, row[column]]),
  ) as Pick<T, K>;
}
