import { ValidateBy, type ValidationArguments } from 'class-validator';

export function HasExactlyOne(
  properties: readonly string[],
): PropertyDecorator {
  return ValidateBy({
    name: 'hasExactlyOne',
    constraints: [properties],
    validator: {
      validate(_value: unknown, args?: ValidationArguments): boolean {
        if (!args) return false;
        const object = args.object as Record<string, unknown>;
        return (
          properties.filter(
            (key) => object[key] !== null && object[key] !== undefined,
          ).length === 1
        );
      },
      defaultMessage: () =>
        'Debe indicar exactamente una referencia de destino.',
    },
  });
}

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
