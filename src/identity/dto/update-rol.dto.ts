import {
  ValidateIf,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

/** Metadatos administrativos: requiere autorizacion en servicio. Validacion de forma; integridad, permisos y transiciones se resuelven en servicio/BD. */
export class UpdateRolDto {
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @MaxLength(90)
  @IsNotEmpty()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string | null;
}
