import {
  ValidateIf,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Validacion de forma; integridad, permisos y transiciones se resuelven en servicio/BD. */
export class UpdateCategoriaDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(120)
  @IsNotEmpty()
  nombre?: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(140)
  @IsNotEmpty()
  identificadorUrl?: string;

  @IsOptional()
  @IsString()
  descripcion?: string | null;
}
