import {
  ValidateIf,
  IsString,
  MaxLength,
  IsOptional,
  IsInt,
  Min,
  Max,
} from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Validacion de forma; integridad, permisos y transiciones se resuelven en servicio/BD. */
export class UpdateActivoDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(24)
  codigoActivo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  direccionEmisor?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  direccionContrato?: string | null;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsInt()
  @Min(0)
  @Max(18)
  decimales?: number;
}
