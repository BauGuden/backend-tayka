import { ValidateBy } from 'class-validator';

/** Decimal textual exacto; sin exponentes, coercion numerica ni perdida de precision. */
export function compareDecimals(left: string, right: string): number {
  const parts = (value: string) => {
    const negative = value.startsWith('-');
    const [integer, fraction = ''] = value.replace(/^[+-]/, '').split('.');
    return { negative, integer, fraction };
  };
  const a = parts(left);
  const b = parts(right);
  const scale = Math.max(a.fraction.length, b.fraction.length);
  const scaled = (part: ReturnType<typeof parts>) =>
    BigInt(
      (part.negative ? '-' : '') +
        part.integer +
        part.fraction.padEnd(scale, '0'),
    );
  const av = scaled(a);
  const bv = scaled(b);
  return av < bv ? -1 : av > bv ? 1 : 0;
}

export function IsExactDecimal(
  precision: number,
  scale: number,
  bounds: { min?: string; max?: string; exclusiveMin?: boolean } = {},
): PropertyDecorator {
  return ValidateBy({
    name: 'isExactDecimal',
    constraints: [precision, scale, bounds],
    validator: {
      validate(value: unknown): boolean {
        if (typeof value !== 'string' || !/^[+-]?\d+(?:\.\d+)?$/.test(value))
          return false;
        const [integer, fraction = ''] = value.replace(/^[+-]/, '').split('.');
        if (
          integer.replace(/^0+(?=\d)/, '').length > precision - scale ||
          fraction.length > scale
        )
          return false;
        if (bounds.min !== undefined) {
          const order = compareDecimals(value, bounds.min);
          if (order < 0 || (bounds.exclusiveMin && order === 0)) return false;
        }
        return (
          bounds.max === undefined || compareDecimals(value, bounds.max) <= 0
        );
      },
      defaultMessage: () =>
        'Debe ser un decimal exacto dentro de la precision, escala y limites SQL.',
    },
  });
}
