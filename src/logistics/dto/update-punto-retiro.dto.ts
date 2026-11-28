import {
  ValidateIf,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { IsExactDecimal } from './decimal-validation';

/** Metadatos administrativos: requiere autorizacion en servicio. Validacion de forma; integridad, permisos y transiciones se resuelven en servicio/BD. */
export class UpdatePuntoRetiroDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(160)
  @IsNotEmpty()
  nombre?: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  direccion?: string;

  @IsOptional()
  @IsString()
  @IsExactDecimal(10, 7, {})
  latitud?: string | null;

  @IsOptional()
  @IsString()
  @IsExactDecimal(10, 7, {})
  longitud?: string | null;
}
