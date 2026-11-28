import { ValidateBy, type ValidationArguments } from 'class-validator';
import { compareDecimals } from './decimal-validation';

function timestampMicros(value: string): bigint | null {
  const match = value.match(
    /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(?:\.(\d{1,6}))?(Z|[+-]\d{2}:\d{2})$/,
  );
  if (!match) return null;
  const milliseconds = Date.parse(match[1] + match[3]);
  return Number.isFinite(milliseconds)
    ? BigInt(milliseconds) * 1000n + BigInt((match[2] || '').padEnd(6, '0'))
    : null;
}

/** En PATCH, comparar con el registro persistido si falta uno de los campos. */
export function IsAfterProperty(property: string): PropertyDecorator {
  return ValidateBy({
    name: 'isAfterProperty',
    constraints: [property],
    validator: {
      validate(value: unknown, args?: ValidationArguments): boolean {
        const other = (args?.object as Record<string, unknown> | undefined)?.[
          property
        ];
        if (other === undefined) return true;
        if (typeof value !== 'string' || typeof other !== 'string')
          return false;
        const end = timestampMicros(value),
          start = timestampMicros(other);
        return end !== null && start !== null && end > start;
      },
      defaultMessage: () => 'vigenteHasta debe ser posterior a vigenteDesde.',
    },
  });
}

export function IsAtLeastProperty(property: string): PropertyDecorator {
  return ValidateBy({
    name: 'isAtLeastProperty',
    constraints: [property],
    validator: {
      validate(value: unknown, args?: ValidationArguments): boolean {
        const other = (args?.object as Record<string, unknown> | undefined)?.[
          property
        ];
        if (other === undefined) return true;
        if (
          typeof value !== 'string' ||
          typeof other !== 'string' ||
          !/^[+-]?\d+(?:\.\d+)?$/.test(value) ||
          !/^[+-]?\d+(?:\.\d+)?$/.test(other)
        )
          return false;
        return compareDecimals(value, other) >= 0;
      },
      defaultMessage: () =>
        'cantidadMaxima no puede ser menor a cantidadMinimaPedido.',
    },
  });
}
