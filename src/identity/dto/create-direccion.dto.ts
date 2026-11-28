import {
  IsOptional,
  IsUUID,
  ValidateIf,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';
import { IsExactDecimal } from './decimal-validation';

/** Propiedad del usuario autenticado; direccion principal y pertenencia se resuelven transaccionalmente. */
export class CreateDireccionDto {
  @IsOptional()
  @IsUUID()
  ciudadId?: string | null;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(70)
  etiqueta?: string;

  @IsString()
  @MaxLength(240)
  @IsNotEmpty()
  direccion!: string;

  @IsOptional()
  @IsString()
  @MaxLength(240)
  detalleDireccion?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(240)
  referenciasUbicacion?: string | null;

  @IsOptional()
  @IsString()
  @IsExactDecimal(10, 7, { min: '-90', max: '90' })
  latitud?: string | null;

  @IsOptional()
  @IsString()
  @IsExactDecimal(10, 7, { min: '-180', max: '180' })
  longitud?: string | null;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsBoolean()
  esPrincipal?: boolean;
}
