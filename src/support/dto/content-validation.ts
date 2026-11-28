import { ValidateBy } from 'class-validator';

/** length(trim(...)) de PostgreSQL: elimina espacios U+0020, cuenta caracteres Unicode. */
export function HasSqlTrimmedLength(
  min: number,
  max?: number,
): PropertyDecorator {
  return ValidateBy({
    name: 'hasSqlTrimmedLength',
    constraints: [min, max],
    validator: {
      validate(value: unknown): boolean {
        if (typeof value !== 'string') return false;
        const length = Array.from(value.replace(/^ +| +$/g, '')).length;
        return length >= min && (max === undefined || length <= max);
      },
      defaultMessage: () =>
        'La longitud del contenido sin espacios exteriores no cumple el CHECK SQL.',
    },
  });
}
