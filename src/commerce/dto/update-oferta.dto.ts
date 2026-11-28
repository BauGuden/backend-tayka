import {
  ValidateIf,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  Matches,
  IsISO8601,
} from 'class-validator';
import { IsExactDecimal } from './decimal-validation';
import { IsAtLeastProperty, IsAfterProperty } from './offer-validation';

/** Proveedor desde contexto autorizado; precios ofertados editables solo bajo reglas comerciales. No montos congelados. Comparar PATCH fusionado con registro persistido para restricciones cruzadas. */
export class UpdateOfertaDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(220)
  @IsNotEmpty()
  titulo?: string;

  @IsOptional()
  @IsString()
  descripcionCondiciones?: string | null;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(12)
  codigoMoneda?: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @IsExactDecimal(20, 7, { min: '0' })
  precioUnitario?: string;

  @IsOptional()
  @IsString()
  @IsExactDecimal(20, 7, { min: '0' })
  precioMinoristaReferencia?: string | null;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @IsExactDecimal(16, 3, { min: '0', exclusiveMin: true })
  cantidadMinimaPedido?: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsInt()
  @Min(0)
  minimoCompradores?: number;

  @IsOptional()
  @IsString()
  @IsExactDecimal(16, 3, { min: '0', exclusiveMin: true })
  @IsAtLeastProperty('cantidadMinimaPedido')
  cantidadMaxima?: string | null;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @Matches(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|[+-]\d{2}:\d{2})$/,
  )
  @IsISO8601({ strict: true, strictSeparator: true })
  vigenteDesde?: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @Matches(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|[+-]\d{2}:\d{2})$/,
  )
  @IsISO8601({ strict: true, strictSeparator: true })
  @IsAfterProperty('vigenteDesde')
  vigenteHasta?: string;

  @IsOptional()
  @IsString()
  condicionesGarantia?: string | null;

  @IsOptional()
  @IsString()
  condicionesDevolucion?: string | null;
}
